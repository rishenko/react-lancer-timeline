import json
import uuid

# This is a simple helper function to add uuids to timeline entries.
# 
# How to Use:
# - place a timeline data file in the same directory as this script
# - execute the python script
# - verify any changes made in the timeline

# Open the file and load the JSON
with open('lancer-timeline-data.json', 'r') as f:
    data = json.load(f)

# Iterate through the timeline and add UUIDs
for record in data['timeline']:
    record['uuid'] = str(uuid.uuid4())

# Write the result back into a JSON file
with open('lancer-timeline-data.json', 'w') as f:
    json.dump(data, f, indent=4)