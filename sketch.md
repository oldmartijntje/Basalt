You can export single plays and the whole scheblang at once.

json format when exporting everything at once:
```json
{
    "about": "...",
    "tags": [ // optional
    ],
    "groups": [ // optional
    ],
    "players": [
        
    ],
    "locations": [
        
    ],
    "games": [
        
    ],
    "plays": [
        
    ],
    "challenges": [// optional
    ],
    "deletedObjects": [// optional
    ],
    "userInfo": {
        "meRefId": 2,
        "bggUsername": "...", // optional
        "exportDate": "2025-04-27 22:59:44", // optional
        "appVersion": "v5.7.1 (5070101)", // optional
        "systemVersion": "...", // optional
        "device": "..." // optional
    }
}
```


Main json format when exporting a play:
```json
{
    "about": "...",
    "tags": [ // optional
    ],
    "groups": [ // optional
    ],
    "players": [
        
    ],
    "locations": [
        
    ],
    "games": [
        
    ],
    "plays": [
        
    ],
    "challenges": [// optional
    ],
    "deletedObjects": [// optional
    ],
    "userInfo": {
        "meRefId": 1,
        "bggUsername": "...", // optional
        "exportDate": "2025-04-27 22:59:44", // optional
        "appVersion": "v5.7.1 (5070101)", // optional
        "systemVersion": "...", // optional
        "device": "..." // optional
    }
}
```

tags:
```json
{
    "uuid": "...",
    "id": 1,
    "name": "...", // the name of the tag
    "type": "Personal", // whether it is a location tag, person tag etc
    "group": "Default", // idk
    "isInternal": true,
    "isDefault": false,
    "isHidden": false,
    "modificationDate": "2022-12-29 17:59:23"
}
```


Players:
```json
{
    "uuid": "...",
    "id": 1,
    "name": "...",
    "isAnonymous": false,
    "modificationDate": "2024-05-31 21:17:20",
    "bggUsername": "", // optional
    "metaData": {
        "bgaUsername": "", // optional
        "yucataUsername": "", // optional
        "isNpc": 0
    },
    "tags": [ // optional
        {
            "tagRefId": 3,
            "metaData": {
            "date": "2024-08-09 21:42:14"
            }
        }
    ]
}
```
this is basically just data about the player that played, directly loaded from the players table.

Locatons:
```json
{
    "uuid": "...",
    "id": 2,
    "name": "...",
    "modificationDate": "2022-11-25 22:46:07",
    "tags": [ // optional
        {
          "tagRefId": 22,
          "metaData": {
            "date": "2024-08-09 22:05:18"
          }
        }
    ]
}
```
there should only be 1 location per play export.

games:
```json
{
    "uuid": "...",
    "id": 274,
    "name": "...",
    "modificationDate": "2025-04-27 12:12:32",
    "cooperative": false,
    "highestWins": true,
    "noPoints": false,
    "usesTeams": false,
    "urlThumb": "https://cf.geekdo-images.com/KoVOY6xiX0liVz3G9g-l2g__thumb/img/F-Efqc4W-x4P02E-lPNJGMhWW10=/fit-in/200x150/filters:strip_icc()/pic8846771.png",
    "urlImage": "https://cf.geekdo-images.com/KoVOY6xiX0liVz3G9g-l2g__original/img/U_0rArbGDyDvA2ox2UVk0WgIzgQ=/0x0/filters:format(png)/pic8846771.png",
    "bggName": "....",
    "bggYear": 2025,
    "bggId": 445031,
    "designers": "....",
    "metaData": { // optional
        "CollectionHistory": {
            "20250412": 0 // gotta find out what this is a reference to
        }
    },
    "isBaseGame": 1,
    "isExpansion": 0,
    "rating": 0,
    "minPlayerCount": 2,
    "maxPlayerCount": 5,
    "minPlayTime": 30,
    "maxPlayTime": 30,
    "minAge": 8,
    "preferredImage": 0, // optional
    "previouslyPlayedAmount": 0, // optional
    "copies": [ // optional
        {
            "uuid": "8e7ada70-80b6-427b-9e37-d1be82388849",
            "modificationDate": "2024-03-15 19:50:02",
            "metaData": {
                "PublicComment": "...",
                "Rating": "10",
                "PricePaidCurrency": "",
                "CurrentPriceCurrency": "",
                "PricePaid": "",
                "PrivateComment": "",
                "WishlistComment": "",
                "CurrentPrice": "",
                "Barcode": "",
                "AcquiredFrom": "",
                "AcquisitionDate": "",
                "InventoryDate": "",
                "InventoryLocation": "",
                "Quantity": "",
                "HaveParts": "",
                "WantParts": "",
                "TradeCondition": ""
            },
            "bggCollId": 110800789,
            "statusOwned": true,
            "statusWishlist": false,
            "statusWantToPlay": false,
            "statusWantInTrade": false,
            "statusForTrade": false,
            "statusPrevOwned": false,
            "statusPreordered": false,
            "statusWantToBuy": false,
            "wishlistStatus": 3,
            "bggUserName": "...",
            "year": 0,
            "urlImage": "https://cf.geekdo-images.com/9ecXyT0e-SYk7I_dYsBFHQ__thumb/img/sJWeXpGgfpOqVAU7MMW3zzQ5mHA=/fit-in/200x150/filters:strip_icc()/pic6865538.jpg",
            "urlThumb": "https://cf.geekdo-images.com/9ecXyT0e-SYk7I_dYsBFHQ__thumb/img/sJWeXpGgfpOqVAU7MMW3zzQ5mHA=/fit-in/200x150/filters:strip_icc()/pic6865538.jpg"
        }
    ] 
}
```

plays:
```json
{
    "uuid": "...",
    "modificationDate": "2025-04-27 15:18:56",
    "entryDate": "2025-04-27 14:47:26",
    "playDate": "2025-04-27 14:47:26",
    "usesTeams": false,
    "durationMin": 31,
    "ignored": false,
    "manualWinner": false,
    "rounds": 0,
    "bggId": 68110692, // optional
    "bggLastSync": "2024-08-20 23:49:47", // optional
    "importPlayId": 0, // optional
    "scoresheet": { // optional
        "bggId": 822,
        "version": 0,
        "langCode": "en",
        "scoreType": "bestTotalWins",
        "rounds": [
            {
                "templateId": "1",
                "maxRepeat": -1,
                "repetition": 1,
                "hasSubTotal": false,
                "hideSingleGroupLabel": false,
                "isExtra": false,
                "rows": [
                    {
                        "templateId": "row1",
                        "label": "{row}.",
                        "repetition": 1,
                        "repeatable": true,
                        "negative": false,
                        "isExtra": false,
                        "scores": {
                            "75c16940-5255-41ab-a233-f721a7442d05": "339",
                            "3b985399-5434-4ceb-a8d0-577578782cc6": "257"
                        }
                    },
                    {
                        "templateId": "row1",
                        "label": "{row}.",
                        "repetition": 2,
                        "repeatable": true,
                        "negative": false,
                        "isExtra": false,
                        "scores": {}
                    },
                    {
                        "templateId": "row1",
                        "label": "{row}.",
                        "repetition": 3,
                        "repeatable": true,
                        "negative": false,
                        "isExtra": false,
                        "scores": {}
                    }
                ]
            }
        ]
    },
    "locationRefId": 2,
    "gameRefId": 274, // this links to the "id": 274 in the games section
    "board": "", // this is a varient
    "rating": 0, // optional
    "nemestatsId": 0, // optional
    "scoringSetting": 1,
    "playImages": [ // optional
        {
            "url": "content://com.android.providers.media.documents/document/image%3A1000011283"
        }
    ],
    "metaData": {
        "playerRefId": 1, // optional
        "playGameBggVersion": "{\"versionId\":756719,\"gameName\":\"Tectonic Tribes\",\"versionName\":\"Dutch\\/English edition\",\"languages\":\"Dutch, English\",\"publishers\":\"Jolly Dutch Productions\",\"yearPublished\":2025}", // optional
        "playUsedGameCopy": 2
    },
    "playerScores": [
        {
            "score": "22",
            "winner": false,
            "newPlayer": false,
            "startPlayer": true,
            "playerRefId": 1,
            "role": "",
            "rank": 2,
            "seatOrder": 0,
            "metaData": { // optional
                "scoreUuid": "75c16940-5255-41ab-a233-f721a7442d05"
            }
        }
    ],
    "expansionPlays": [
        {
            "gameRefId": 27, // this links to the "id": 27 in the games section
            "bggId": 0
        },
        {
            "gameRefId": 6, // this links to the "id": 6 in the games section
            "bggId": 0
        }
    ]
}
```
this one is going to be ass to implement

challanges:
```json
{
    "uuid": "826e4214-b023-4645-9005-071bc8223b41",
    "name": "...",
    "modificationDate": "2024-03-16 18:15:51",
    "type": 1,
    "autoFill": false,
    "startDate": "1970-01-01 18:15:04",
    "endDate": "2099-12-31 18:15:02",
    "hardCore": false,
    "completed": false,
    "value1": 0,
    "value2": 5,
    "metaData": {
        "GameType": 1
    },
    "games": [
        { // if this is filled, pretty sure it will only take the items iin it where "dontInclude": false, unless there are none of these.
            "dontInclude": false,
            "gameRefId": 2 // this links to the "id": 2 in the games section
        }
    ]
}
```

