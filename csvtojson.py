import csv
import json

# Define file paths
csv_file_path = "updated_supermarket_dataset_limited.csv"
json_file_path = "updated_supermarket_dataset_limited.json"

# Load existing JSON data
try:
    with open(json_file_path, "r", encoding="utf-8") as json_file:
        existing_data = json.load(json_file)
except FileNotFoundError:
    existing_data = []

# Read CSV, filter for IDs between 717 and 800, and convert to JSON
new_data = []
with open(csv_file_path, encoding="utf-8") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        # Extract the numeric part of the product ID and check if it's in range
        product_id = int(row["Product ID"].lstrip("P"))
        if 717 <= product_id <= 800:
            new_data.append(row)

# Append new data to existing JSON data
existing_data.extend(new_data)

# Write updated JSON data back to the file
with open(json_file_path, "w", encoding="utf-8") as json_file:
    json.dump(existing_data, json_file, indent=4)

print(
    f"Updated JSON file with filtered data between Product IDs 717 and 800 at: {json_file_path}"
)
