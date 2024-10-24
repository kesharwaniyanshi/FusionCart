from googleapiclient.discovery import build
import pandas as pd
import time
from googleapiclient.errors import HttpError

# Your Google Custom Search API key and search engine ID
API_KEY = "AIzaSyBHQ2BDclENB8zguc_E4QTyIID_HbBw1eE"  # Update with your valid API key
SEARCH_ENGINE_ID = "b4ba369391c7e4e91"

# Build the custom search service
service = build("customsearch", "v1", developerKey=API_KEY)

# Cache to store previously fetched image URLs to avoid duplicate API calls
image_url_cache = {}

# Function to fetch image URL from Google Custom Search with retry logic
def fetch_image_url(product_name, brand_name, retries=3, delay=5):
    # Combine product name and brand name for more accurate search
    query = f"{product_name} {brand_name}"

    # Check if the product image URL is already in cache
    if query in image_url_cache:
        print(f"Using cached image for: {query}")
        return image_url_cache[query]

    for attempt in range(retries):
        try:
            print(f"Fetching image for: {query}")
            result = (
                service.cse()
                .list(
                    q=query,  # Search with combined product and brand name
                    cx=SEARCH_ENGINE_ID,
                    searchType="image",
                    num=1,  # Get only one result
                )
                .execute()
            )

            if "items" in result:
                image_url = result["items"][0]["link"]  # Return the first image link
                image_url_cache[query] = image_url  # Save to cache
                return image_url
            else:
                print(f"No image found for: {query}")
                return None  # Return None if no image is found

        except HttpError as e:
            if e.resp.status == 429:
                print(f"Quota exceeded. Retrying in {delay} seconds...")
                time.sleep(delay)  # Wait before retrying
                delay *= 2  # Exponential backoff
            else:
                print(f"HttpError fetching image for {query}: {e}")
                return None

    print(f"Failed to fetch image for {query} after {retries} attempts.")
    return None

# Load your product data
df = pd.read_csv("supermarket_dataset_4floors_4sections.csv")

# Limit to first 5 rows for testing
limited_df = df.head(8)

# Apply the fetch_image_url function to the "Product Name" and "Brand Name" columns
limited_df["Image URL"] = limited_df.apply(lambda row: fetch_image_url(row["Product Name"], row["Brand"]), axis=1)

# Save the updated DataFrame to a new CSV file
limited_df.to_csv("updated_supermarket_dataset_limited.csv", index=False)

print("Image URLs have been added and saved to updated_supermarket_dataset_limited.csv")