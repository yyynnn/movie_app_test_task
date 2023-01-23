// можно описать глобальные типы для модулей у кооторых этих типов нет
// чтобы не было ошибок в редакторе при импорте зависимостей
declare module 'some-old-module-from-github-that-doesnt-have-types' {
  export function someOldUtilFromGithubThatDoesntHaveTypes(): any
}
// import { someOldUtilFromGithubThatDoesntHaveTypes } from 'some-old-module-from-github-that-doesnt-have-types'
// и ошибки импорта не будет

// неймспейсы
// позволяют ограничить типы в именном блоке
// чтобы избежать глобальых конфликтов/коллизий
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean
  }

  const lettersRegexp = /^[A-Za-z]+$/
  const numberRegexp = /^[0-9]+$/

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s)
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s)
    }
  }
}
// доступ к типам через точку
// Validation.StringValidator

// можно разделять между файлами
// file1.d.ts
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean
  }
}
// file2.d.ts
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/
  const numberRegexp = /^[0-9]+$/

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s)
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s)
    }
  }
}
