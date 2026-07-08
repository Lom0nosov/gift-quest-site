# Gift Quest Site

Небольшой статический сайт для сюрприза на день рождения.

## Что менять

Основной текст лежит в `script.js` внутри объекта `siteContent`:

- `girlName` - имя девушки
- `relationshipStart` - дата начала отношений в формате `YYYY-MM-DD`
- `heroTitle` и `heroText` - главный экран
- `wishText` - короткое пожелание
- `reasons` - список теплых фраз
- `letterLines` - текст письма
- `surpriseTitle` и `surpriseText` - финальная подсказка

## Как открыть локально

Просто открой `index.html` в браузере.

## Как выложить на GitHub Pages

1. Создай пустой репозиторий на GitHub.
2. Выполни:

```bash
git add .
git commit -m "Add birthday surprise site"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

3. В настройках репозитория включи `Pages` для ветки `main` и корня репозитория.
4. Ссылка будет в виде `https://<username>.github.io/<repo-name>/`.

## Идея для пазла

На обратной стороне пазла можно написать:

`Продолжение здесь: <короткая ссылка>`

или

`Переверни пазл и найди финал`
