/**
 * RESTRICTIONS
 * category - for sorting
 * rows - for rows
 * input - for input field
 */

interface Background {
    size: number;
    width: number;
    height: number;
    type: string;
}

interface Image {
    size: number;
    type: string;
}

interface Audio {
    size: number;
    type: string;
}

interface Restrictions {
    background: Background;
    audio: Audio;
    image: Image;
    programType: number|string;
    revision: Object;
    4: Object;
    5: Object;
    6: Object;
    7: Object;
    8: Object;
    9: Object;
    10: Object;
    11: Object;
    12: Object;
    13: Object;
}

/**
 * в БД - catalog_video_category table
 *
 * Programs type
 * 4 - Basic Lexis +
 * 5 - Here and There +
 * 6 - English 911
 * 7 - What did they say?
 * 8 - Step by Step +
 * 9 - Grammar Wise +
 * 10 - City Grammar +
 * 11 - English Up
 * 12 - Speaking to the World
 * 13 - Perfect English
 */

export const RESTRICTIONS: Restrictions = {
    background:  {
        size:   2097152, //2 mb
        width:  1280,
        height: 720,
        type:   'image/jpg'
    },
    audio:       {
        size: 307200, // 300 kb
        type: 'audio/mp3'
    },
    image:       {
        size: 512000, // 500 kb
        type: 'image/jpg'
    },
    programType: window[ 'PROGRAM_TYPE' ],
    'revision':  {
        'build-the-word':     {
            input: 1,
            rows:  14
        },
        'build-the-sentence': {
            input: 50,
            rows:  8,
            total: 50
        },
        'true-or-false':      50,  // after 25 second row; max 2 rows;
        'odd-one-out':        10,
        'beethoven':          3,
        'sorting':            {
            category: 40, // after 20 second row
            input:    60 // after 20 second row; after 40 third row;
        },
        'matching-picture':   {
            input:       30, // after 13 second row
            rows:        3,
            imageWidth:  400,
            imageHeight: 225
        },
        'matching-words':     {
            input: 30,
            rows:  3
        },
        'tap-right-picture':  {
            input:       15,
            rows:        3,
            imageWidth:  400,
            imageHeight: 225
        },
        'tap-right-word':     {
            input:    16,
            sentence: 70
        }
    },
    4:           {
        'build-the-word':     {
            input: 1,
            rows:  14
        },
        'build-the-sentence': {
            input: 10,
            rows:  8,
            total: 50
        },
        'true-or-false':      40,  // after 26 second row; max 2 rows;
        'odd-one-out':        10,
        'beethoven':          3,
        'sorting':            {
            category: 16, // after 12 second row
            input:    26 // after 13 second row
        },
        'matching-picture':   {
            input:       26, // after 13 second row
            rows:        3,
            imageWidth:  245,
            imageHeight: 312
        },
        'matching-words':     {
            input: 18, // max 1 row
            rows:  3
        },
        'tap-right-picture':  {
            input:       14,
            rows:        3,
            imageWidth:  380,
            imageHeight: 490
        },
        'tap-right-word':     {
            input:    10,
            sentence: 50
        },
        'tap-streak':         {
            input:            26, // after 12 second row; for big images
            inputSmall:       8, // for small images
            rows:             6,
            imageWidth:       550,
            imageHeight:      296,
            imageWidthSmall:  367,
            imageHeightSmall: 300
        }
    },
    5:           {
        'build-the-word':     {
            input: 1,
            rows:  12
        },
        'build-the-sentence': {
            input: 14,
            rows:  -1, // нет в макете
            total: 50
        },
        'true-or-false':      55, // after 20 second row; after 40 third row; last row max 15
        'beethoven':          3,
        'matching-picture':   {
            rows:        3,
            input:       17, // after 11 second row
            imageWidth:  336,
            imageHeight: 360
        },
        'matching-words':     {
            rows:  3,
            input: 50 // after 22 second row
        },
        'tap-right-picture':  {
            rows:        3,
            input:       50, // max one row
            imageWidth:  336,
            imageHeight: 360
        },
        'tap-right-word':     {
            input: 30, // after 15 second row;
            total: 50
        },
    },
    6:           {
        'build-the-word':     '',
        'build-the-sentence': '',
        'true-or-false':      '',
        'odd-one-out':        '',
        'beethoven':          3,
        'sorting':            '',
        'matching-picture':   {
            rows: 3
        },
        'matching-words':     {
            rows: 3
        },
        'tap-right-picture':  '',
        'tap-right-word':     '',
        'tap-streak':         ''
    },
    7:           {
        'build-the-word':     '',
        'build-the-sentence': '',
        'true-or-false':      '',
        'odd-one-out':        '',
        'beethoven':          3,
        'sorting':            '',
        'matching-picture':   {
            rows: 3
        },
        'matching-words':     {
            rows: 3
        },
        'tap-right-picture':  '',
        'tap-right-word':     '',
        'tap-streak':         ''
    },
    8:           {
        'build-the-word':    {
            input: 1,
            rows:  12
        },
        'matching-picture':  {
            input:       24, // after 12 second row
            rows:        3,
            imageWidth:  320,
            imageHeight: 180
        },
        'tap-right-picture': {
            input:       14,
            rows:        3,
            imageWidth:  320,
            imageHeight: 180
        },
        'tap-right-word':    {
            input:    12,
            sentence: -1
        },
        'tap-streak':        {
            input:       13,
            rows:        6,
            imageWidth:  320,
            imageHeight: 180
        }
    },
    9:           {
        'build-the-sentence': {
            rows:  5,
            input: 14,
            total: 70
        },
        'true-or-false':      50, // after 25 second row; max 2 rows;
        'odd-one-out':        30, // after 16 second row; max 2 rows;
        'sorting':            {
            category: 30, // after 15 second row
            input:    75 // after 30 second row; after 60 third row; last row max 15
        },
        'matching-words':     {
            input: 50, // after 17 second row; after 34 third row;
            rows:  3
        },
        'tap-right-word':     {
            rows:  5,
            input: 14
        }
    },
    10:          {
        'true-or-false':    50, // after 25 second row;
        'odd-one-out':      30,  // after 16 change container height
        'sorting':          {
            category: 40, // after 20 second row
            input:    60 // max 25 in row; max 3 rows
        },
        'matching-picture': {
            input:       30, // after 16 second row
            rows:        3,
            imageWidth:  300,
            imageHeight: 290
        },
        'matching-words':   {
            input: 50, // after 17 second row; after 34 third row
            rows:  3,
            total: 100
        },
        'tap-right-word':   {
            input: 16,
            total: 60 // max 2 rows
        }
    },
    11:          {
        'build-the-word':     '',
        'build-the-sentence': '',
        'true-or-false':      '',
        'odd-one-out':        '',
        'beethoven':          3,
        'sorting':            '',
        'matching-picture':   {
            rows: 3
        },
        'matching-words':     {
            rows: 3
        },
        'tap-right-picture':  '',
        'tap-right-word':     '',
        'tap-streak':         ''
    },
    12:          {
        'build-the-word':     '',
        'build-the-sentence': '',
        'true-or-false':      '',
        'odd-one-out':        '',
        'beethoven':          3,
        'sorting':            '',
        'matching-picture':   {
            rows: 3
        },
        'matching-words':     {
            rows: 3
        },
        'tap-right-picture':  '',
        'tap-right-word':     '',
        'tap-streak':         ''
    },
    13:          {
        'build-the-word':     '',
        'build-the-sentence': '',
        'true-or-false':      '',
        'odd-one-out':        '',
        'beethoven':          3,
        'sorting':            '',
        'matching-picture':   {
            rows: 3
        },
        'matching-words':     {
            rows: 3
        },
        'tap-right-picture':  '',
        'tap-right-word':     '',
        'tap-streak':         ''
    },
};
