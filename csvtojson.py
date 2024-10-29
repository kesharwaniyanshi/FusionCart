import csv
import json

# Define file paths
csv_file_path = "updated_supermarket_dataset_limited.csv"
json_file_path = "updated_supermarket_dataset_limited.json"

# Read CSV and convert to JSON
data = []
with open(csv_file_path, encoding="utf-8") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Write JSON data to a file
with open(json_file_path, "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, indent=4)

print(f"JSON file created at: {json_file_path}")
