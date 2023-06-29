# Unofficial Lancer Universe Timeline

## Overview

This project seeks to provide an interactive timeline for content in the Lancer universe using the React framework.

Please note this readme is incomplete and this project not quite ready for primetime.

## How to Run

1. Download and install [Node JS](https://nodejs.dev/en/learn/how-to-install-nodejs/).
2. Clone this repository to your computer.
3. Open a terminal window and change to the directory of your cloned folder.
4. Type in `npm install` and hit Enter.
5. Type in `npm start` to run the application locally.

## Data Formats

The data used to build the timeline can be found in `src/lancer-timeline-data.json`. The JSON data contains listings for:

- Factions
- Sources
- Publishing Attributes
- Timeline Entries

The top level structure of the JSON data file is as follows:

```json
{
    "factions": {},
    "sources": {},
    "publishingAttributes": {},
    "timeline": []
}
```

### Factions

Faction entries are in the following format:

```text
"(string; faction unique id, words separated by dashes)": {
    "name": (string; full name for faction),
    "color": (string; hexcode for color used in faction buttons and timeline entry background colors)
}
```

Example faction entry:

```json
"union": {
    "name": "Union",
    "color": "#000000"
}
```

### Sources


```text
 "(string; source unique id, acronyms or single word name preferred)": {
            "name": (string; full name of source book),
            "publishingAttributes": [(string; comma separate strings of publishing attribute keys)],
            "url": "https://massif-press.itch.io/corebook-pdf"
        },
```

Example source entry:

```json
"lcrb": {
        "name": "Lancer Core Rulebook",
        "publishingAttributes": [
            "first",
            "published"
        ],
        "url": "https://massif-press.itch.io/corebook-pdf"
    }
```

### Timeline Entries

Timeline entries are represented in the following format:

```text
{
    "year": (number; start year for the entry),
    "uuid": (required, string; unique identifier for timeline entry, preferably a uuid4),
    "marker": (optional, boolean; flags this entry as a marker, which has a much smaller footprint and is meant for non-event entries, like a marker every 1000 years),
    "intraYearIndex": (number; index number, where lower is shown first, to be added on events happening in the same year to ensure certain events come before others),
    "era": (string; the era of the timeline designated as "BU" or "U"),
    "factions": [(array of strings: the faction key, choose one from the `factions` node in the JSON data library)],
    "title": (string: title of the timeline entry),
    "descr": (string: the description of the timeline entry),
    "sources": [
        {
            "source": (string: a source key from the sources list)
            "sourceLocation": (string: the location of the timeline entry in the source, usually pages in a book)
        }
    ]
}
```

Note that all timeline entries must contain a source from a publication.

Example entry:

```json
{
    "year": 4600,
    "intraYearIndex": 1,
    "era": "U",
    "factions": [
        "union"
    ],
    "title": "Second Committee Surrenders, Founding of Third Committee",
    "descr": "New stable government in Union is formed, the Third Committee (ThirdComm). The Union Colonial Mission is immediately dissolved and the Union Administrative Department is reconstituted. Expansion is halted.",
    "uuid": "b9c82cef-354c-4e53-859b-45393767aa30",
    "sources": [
        {
            "sourceKey": "lcrb",
            "sourceLocation": "pgs. 339"
        }
    ]
}
```

#### Marker Entries

Marker entries are used to index specific points of time that don't have an associated timeline event. For instance, in the data there are marker entries for every 1000 years. This way users can save links that will take them directly to a specific year, or be able to search for a specific 1000 year block. Also note how `intraYearIndex` is added to make sure the record appears first.

Example marker entry:

```json
{
    "year": 5000,
    "intraYearIndex": 1,
    "marker": true,
    "era": "U",
    "factions": [
        "no-faction"
    ],
    "title": "5000U Marker",
    "descr": "",
    "sources": [
        {
            "sourceKey": "no-source",
            "sourceLocation": ""
        }
    ],
    "uuid": "91e4e8c0-50a1-401d-bfa8-2bee7cbed0b9"
}
```

It should be noted that timeline entries are automatically sorted by the React app. The sort order is descending `year` for entries in the `BU` era, and ascending `year` for entries in the `U` era.

## On Contributing

### Data

This site's content is populated using the data format outlined under _Data Formats_, where all data is stored and pulled from `src/lancer-timeline-data.json`. All data contributions should follow the above data formats and pattern. It should be noted that there is no required ordering of nodes or list items in any of the data structures.

#### FOR AUTHORS OF PUBLISHED THIRD PARTY CONTENT

This project is more than happy to receive and present any timeline data from people who have published third party content. All entries have sources at the bottom that link to a given source's home or store page.

If the submitter is not the author of the third party content, the submitter will need to present some form of validation that they have received consent from the author, or have the content author contact the admins of this project.

### Code

This is my first React app. There are bound to be any number of odd bugs that could be fixed, inefficiencies to be found, and improvements to be made. So what's next, and what am I looking for? Currently, the goals of this project are: simplicity; easy to update data structures; clean and simple user interface; and a snappy response time.

Please keep those things in mind when making suggestions or submitting PRs for feature additions.

## Credits

This timeline would not be possible without all of the hard work by Massif Press' Lancer team and the many supporters and third party content creators. All SVG faction logos were borrowed from Massif's Compcon repo.

All timeline entries are credited to their authors via links to Sources.

The original design of the timeline is based on the following CodePen:
A Pen created on CodePen.io. Original URL: [https://codepen.io/MarkBoots/pen/OJOqNyB](https://codepen.io/MarkBoots/pen/OJOqNyB).

## License

This project is licensed under the GPL v3 license.

## Legal

_Unofficial Lancer Universe Timeline_ is not an official Lancer product; it is a third party work, and is not affiliated with Massif Press. _Unofficial Lancer Universe Timeline_ is published via the Lancer Third Party License.

All timeline entries are copyright and owned by their respective creators.

Lancer is copyright Massif Press
