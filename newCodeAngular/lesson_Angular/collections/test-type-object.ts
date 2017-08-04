/**
 *
 * @param {number, string} test_model id типа модели теста
 */

interface TestTypeObject {
    ui: Object;
    cabinet: Object;
}

export let TEST_TYPE_OBJECT: TestTypeObject = {
    ui:      {
        'odd-one-out':        {
            "id_test_type": 7,
            "test_model":   8
        },
        'tap-streak':         {
            "id_test_type": 8,
            "test_model":   9
        },
        'true-or-false':      {
            "id_test_type": 5,
            "test_model":   6
        },
        'matching-picture':   {
            "id_test_type": 11,
            "test_model":   12
        },
        'beethoven':          {
            "id_test_type": 9,
            "test_model":   10
        },
        'tap-right-picture':  {
            'id_test_type': 2,
            'test_model':   3
        },
        'matching-words':     {
            "id_test_type": 10,
            "test_model":   11
        },
        'build-the-sentence': {
            "id_test_type": 3,
            "test_model":   4
        },
        'tap-right-word':     {
            "id_test_type": 4,
            "test_model":   5
        },
        'sorting':            {
            "id_test_type": 6,
            "test_model":   7
        },
        'build-the-word':     {
            "id_test_type": 20,
            "test_model":   1
        }
    },
    cabinet: {
        'odd-one-out':        {
            "id_test_type": 8,
            "test_model":   8
        },
        'tap-streak':         {
            "id_test_type": 9,
            "test_model":   9
        },
        'true-or-false':      {
            "id_test_type": 6,
            "test_model":   6
        },
        'matching-picture':   {
            "id_test_type": 12,
            "test_model":   12
        },
        'beethoven':          {
            "id_test_type": 10,
            "test_model":   10
        },
        'tap-right-picture':  {
            'id_test_type': 3,
            'test_model':   3
        },
        'matching-words':     {
            "id_test_type": 11,
            "test_model":   11
        },
        'build-the-sentence': {
            "id_test_type": 4,
            "test_model":   4
        },
        'tap-right-word':     {
            "id_test_type": 5,
            "test_model":   5
        },
        'sorting':            {
            "id_test_type": 7,
            "test_model":   7
        },
        'build-the-word':     {
            "id_test_type": 1,
            "test_model":   1
        }
    }
};