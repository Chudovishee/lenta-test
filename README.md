# lenta-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Notes

Предполагается следующая интеграция с реальным апи и взаимодействие с ним:
* Реализуем `MessengerProxyInterface` на основе настоящего апи
* Заменяем `MessengerProxyMock` в сторе на полученую реализацию
* Добавляем механизм уведомлений, например, на основе веб-сокетов
* Механизм уведомлений должен начать вызывать `fetchDownMessages` тем самым заставля приложение прогрузить ленту сообщений вниз


### Недоработки о которых я знаю, но мне лень было ими заниматься
Отсутствуют какие-либо проверки ошибок и валидация.
По идее экшены переварят реджекты от прокси, но дальше интерфейс
будет крякать.

Пейджинг на основе меток времени может крякнуть.
Особенно с дискретностью в 1ms. На самом деле тут должен быть механизм
на основе ключей, генерируемых на сервере. Это больше проблема бэка,
а на стороне фронта разницы особой нет. По факту сейчас в роли такого
ключа используется поле `created` и это изменить достаточно просто.  

Механизм добавления нового сообщения и прогрузки вниз на самом деле
работает некоректно. Сейчас новое сообщение сдвигает метку времени
вниз и фактически уничтожает все неполученные сообщения. На самом деле,
где-то в этом месте должна быть синхронизация и объядинение локального
состояния с удаленным. Например, примерно так:
* закидываем все новые сообщения в стор без ключа
* все сообщения без ключей по умолчанию находятся снизу
* при получении новых сообщений от бэка они встаиваются до сообщений без ключа
* при получении ответа на добавление сообщения можно присвоить ключи новым сообщения
  и правильно их отсортировать
  
Скролинг очень неудобный при прогрузке новых сообщений. На моках может
показаться что новые сообщения не появляются так как там тест один и тот же.
Присмотритесь к дате которая изменяется.

Проверка типов в mapActions и mapGetters отсутствует.
В Акронисе обычно мы используем свою имплементацию мапингов
на основе декораторов, которую я затащить сюда не могу.
Я думаю существую подобные открытые решения, но я их не изучал. 

В общем-то я забил на тестирование. Я добавил пару простых тестов на компонент 
и стор что-бы показать как я это примерно делаю. В текущем виде в
приложении не так много логики, поэтому юниты тут писать не очень интересно,
а делать интеграционые я поленился.
  
