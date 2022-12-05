# HEQS UI monorepo

1. сетка через https://github.com/sealninja/react-grid-system (бутстрап подобная сетка container/row/col)
2. компоненты через mui
3. запросы через axios+react-query
4. локальный стейт/стм через react контекст
5. стили styled через emotion (по минималу)
6. напор на использование примитивов packages/uikit. Например все отстпуты можно делать через <Spacer space={20} />, позиционирование через <Flex />
7. автоимпорты работают

# SWAGGER

https://heqs-services-dev.onrender.com/api/documentation#/Dictionaries/Get%20corrective_action_statuses%20dictionary

# MONOREPO tutorial

Всё просто)

В системе контроля версий монорепозиторий («mono» от греческого μόνος, мóнос, 'единственный, одинокий' и репозиторий) является стратегией разработки программного обеспечения, когда код множества подпроектов хранится в одном и том же репозитории.
Код независим, но его место едино. Удобно управлять множеством деплоем, держать рядом приложени и библиотеки, и тд и пт.

Нужен yarn ^v1. Монорепо работает через yarn workspaces. входная точка/директория по умолчанию '/packages' (описана в package.json), вот так:

```json
...
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  },
...
```

Обычно деление пакетов происходит на apps и простые утилиты, например:

```js
;`/packages/heqs-ui-app``/packages/heqs-admin-ui-app``/packages/uikit``/packages/font-roboto`
```

В монорепе внутренние пакеты имеют свои package.json. При установке зависимости которое не упонимаются в других пакетах остаются на уровне;

```js
/packages/heqs-ui-app/node_modules
```

Общие зависимости всплывают в общую директорию `/node_modules`. Туда же идут зависимосты из корневого `/package.json` и доступны везде (в любом проекте). Осторожнее с версиями :)

Для резолва зависимостей просто выполни `yarn` и готово.

Доступ к командам пакетов из корня происходит так:
`yarn workspace @heqs-ui/heqs-ui-app build`.

Названия пакетов дожны строится так:

`@heqs-ui/heqs-ui-app - где @{имя монорепы}/{имя пакета}`

Иллюстрации
https://designs.ai/graphicmaker/illustrations/Duotone_Cartoon_Set
