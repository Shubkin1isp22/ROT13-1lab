//  защита 2 лабы практика
function getSumDateAndAge(age) {
    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    const today = new Date();

    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear() + age;

    return `${day}, ${month}, ${year}`;
}
module.exports = getSumDateAndAge;