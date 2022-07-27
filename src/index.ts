import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, bracketMatching} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const golfScriptLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Identifier: t.variableName,
        Number: t.number,
        String: t.string,
        LineComment: t.lineComment,
        "{ }": t.brace,
        ":": t.updateOperator
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "#"}
  }
})

export function golfScript() {
  return new LanguageSupport(
    golfScriptLanguage,    
    // limit bracket matching to just the delimeters specified in syntax.grammar
    bracketMatching({brackets: "{}"})
  )
}
