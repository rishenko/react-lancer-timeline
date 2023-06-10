# Unofficial Lancer Universe Timeline

## Overview

This project seeks to provide a an interactive timeline for content in the Lancer universe.

Please note this readme is incomplete and this project not quite ready for primetime.

## How to Use

...

## Data Formats

The data used to build the timeline can be found in `src/lancer-timeline-data.json`. The JSON data contains listings for:

- Factions
- Sources
- Publishing Attributes
- Timeline Entries

The top level structure of the JSON data file is as follows:

```json
{
    "factions": [],
    "sources": [],
    "publishingAttributes": [],
    "timeline": []
}
```

### Factions

...

### Sources

...

### Publishing Attributes

...

### Timeline Entries

Timeline entries are represented in the following format:

```text
{
    "year": (number; start year for the entry),
    "era": (string; the era of the timeline designated as "BU" or "U"),
    "faction": (string: the faction key, choose one from the `factions` node in the JSON data library),
    "title": (string: title of the timeline entry),
    "descr": (string: the description of the timeline entry),
    "sources": [
        {
            "source": (string: the source of the timeline entry)
            "sourceLocation": (string: the location of the timeline entry in the source, usually pages in a book)
        }
    ]
}
```

Example entry:

```json
{
    "year": 5500,
    "era": "BU",
    "faction": "ktb",
    "title": "Beginning of The Melee",
    "descr": "5500-4900bu. After communications with Earth cease due to the Fall, Karrakis planetary admin officials seize control over the colony. The colony devolves into factions and war.",
    "sources" : [
        {     
            "source": "Field Guide to the Karrakin Trade Baronies",
            "sourceLocation": "pg. 9"
        }
    ]
}
```

## Credits

This timeline would not be possible without all of the hard work by Massif Press' Lancer team and the many supporters and third party content creators.

The original design of the timeline is based on the following CodePen:
A Pen created on CodePen.io. Original URL: [https://codepen.io/MarkBoots/pen/OJOqNyB](https://codepen.io/MarkBoots/pen/OJOqNyB).

## License

This project is licensed under the MIT license.

## Legal

_Unofficial Lancer Universe Timeline_ is not an official Lancer product; it is a third party work, and is not affiliated with Massif Press. _Unofficial Lancer Universe Timeline_ is published via the Lancer Third Party License.

Lancer is copyright Massif Press