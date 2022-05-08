# toxin-hotel

Собранный проект можно посмотреть [тут](https://alexioi.github.io/toxin-hotel/).

### Запуск проекта локально

1. Скачать репозиторий:

```bash
git clone https://github.com/Alexioi/toxin-hotel.git
```

2. Перейти в директорию проекта:

```bash
cd toxin-hotel/
```

3. Установить зависимости:

```bash
npm ci
```

4. Запустить live-server:

```bash
npm run server
```

### Скрипты

- Компилирует билд и запускает скрипт purgecss

```bash
npm run build
```

- Удаляет из билда неиспользуемые css классы

```bash
npm run purgecss
```

- Запустить скрипт build и после компиляции проекта отправить на gh-pages

```bash
npm run deploy
```

- Запустить live-server реагирующий на изменения в рабочей директории

```bash
npm run server
```

### Используемые плагины

[air-datepicker](https://www.npmjs.com/package/air-datepicker) - добавляет календарь

[event-emitter](https://www.npmjs.com/package/event-emitter) - реализация event emitter

[imask](https://www.npmjs.com/package/imask) - добавляет маску в инпуты

[ion-rangeslider](https://www.npmjs.com/package/ion-rangeslider) - плагин ползунка

[material-icons](https://www.npmjs.com/package/material-icons) - иконочный шрифт

[paginationjs](https://www.npmjs.com/package/paginationjs) - плагин пагинации
