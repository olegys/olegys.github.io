/**
 * @param {number, string} id_test_data id записи
 * @param {number, string} id_catalog_test_type id типа программного теста созданного в системе
 * @param {number} test_ui_type тип интерфеса тестов(2-интерфейс текущей программы, 1-интерфейс кабинета)
 * @param {string} test_background ссылка на файл background (при наличии)
 * @param {number, string} id_curriculum_lesson id урока к которому относится тест
 * @param {string} test_name имя теста
 * @param {number, string} test_model id типа модели теста
 * @param {number, string} type тип теста (
 *              1-видео
 *              2-тест внутри урока,
 *              3-тест ревайз урока,
 *              4-лексический тест урока ревайза,
 *              5-грамматический тест урока ревайза,
 *              6-тест межмодульного контроля)
 * @param {string} test_sound ссылка на звуковой файл теста ( при наличии )
 */

interface TestObject {
    'function': any;
    'test_data': any;
    'question_data': any;
}

export let TEST_OBJECT: TestObject = {
    "function":      '',
    "test_data":     {
        "test_type":       2,
        "id_interface":    2,
        "id_test_type":    null,
        "test_model":      null,
        "background":      '',
        "test_sound":      '',
        'test_sound_name': ''
    },
    "question_data": []
};