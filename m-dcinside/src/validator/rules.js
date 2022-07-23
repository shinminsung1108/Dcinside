import validator from 'validator'

const addOn = {
    // 패스워드 (영문 소문자 또는 대문자 반드시 포함, 숫자 포함, 특수문자 포함, 8~15자 내외
  password: data => {
      const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*])(?=.*[0-8]).{8,15}/
      return regex.test(data)
  },

  // 특수 문자 반드시 미포함
  noSpecial: data => {
      const regex = /[&\/\\#,+()$~%.'":*?<>{}^!@|_=-]/
      return !regex.test(data)
  },
}

// 병합
const rules = Object.assign(addOn, validator)

export default rules