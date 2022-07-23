import produce from 'immer'     // 이뮤터블 유지를 위해 immer.js 를 썼다
import Rules from './rules.js'

// condition 은 email.validator.js 의 condition 형식으로 넘어오고 
// body 는 { email: 'foo@bar.com', name: 'react' } 이런 형식으로 넘어온다. (condition에 존재하지 않는 필드는 자동 삭제된다)
const mainValidator = (condition, body) => { 
    try {
        const result = produce(body, draft => {
            Object.keys(body).map(aField => {                         // body의 field 값만 추출하여 map으로 루프 돌림
                if (typeof condition[aField] !== 'undefined') {        // 컨디션의 첫번째 항목에 포함되어 있을 때만 통과
                    draft[aField] = util.unitValidator({            // 유틸리티 객체의 unitValidator 호출 그리고 결과 반환
                        state: condition[aField],
                        value: body[aField],
                        equalsWith: body[condition[aField]['equalsWith']] ?? null,
                    })
                } else {
                    delete draft[aField]                            // 존재하지 않는 body 삭제
                }
            })
        })

        return result
    } catch (error) {
        console.warn(error)
    }
}

// 유효성 검사용 유틸리티이다
const util = {
    unitValidator: ({ state = {}, value = null, equalsWith = null }) => {     // 개별 필드를 검사한다.
        const invalidRuleArr = state.rules
            .filter(aRule => {
                const isValid = /\[/.test(aRule)
                    // 컨디션의 필드중에 대괄호가 있는 룰 검사 예) isLength[{"min": 5, "max": 40}]
                    // 일명 파라미터 룰이라고 명명 했다.
                    ? util.checkParameteredRule(aRule, value)
                    // 대괄호가 없는 룰 검사
                    : util.checkCommonRule(aRule, value, equalsWith)

                return !isValid
            })
            .map(aRule => aRule.split('[')[0])

        // 결과
        const result =
            invalidRuleArr.length === 0
                ? { isValid: true, message: null } // 성공 
                : { isValid: false, message: state.message[invalidRuleArr[0]] } // 실패

        return result
    },

      // 파라미터 룰 검사
    checkParameteredRule: (aRule, value) => {
          // 정규식으로 파라미터 추출
        const ruleParams = JSON.parse(aRule.match(/\[(.*?)\]/)[1])
        // 파라미터를 제외한 룰 이름 추출
        const newRule = aRule.split('[')[0]
        // 유효성 검사
        const isValid = Rules[newRule](value, ruleParams)

        return isValid
    },

      // 일반 룰 검사
    checkCommonRule: (aRule, value, equalsWith) => {
          // 유효성 검사
        const isValid =
            aRule == 'equals' || aRule == 'matches'
                ? Rules[aRule](value, equalsWith)
                : Rules[aRule](value)

        return isValid
    },
}

export default mainValidator