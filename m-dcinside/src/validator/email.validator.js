import mainValidator from './validator'

const condition = {
    email: {
        rules: ['isEmail', 'isLength[{"min": 5, "max": 40}]'], // 유효성 검사 조건
        message: {
            isEmail: '이메일 형식으로 입력해주세요.',
            isLength: '1~30자 내외로 입력해주세요',
        },
    },

    password: {
        rules: ['password'], // 유효성 검사 조건
        message: {
            password: '8~15자 내외로 입력해주세요, 형식 좀 맞춰주셈',
        },
    },
}

// 실제로 호출 되는 것
const email = body => {
    return mainValidator(condition, body)
}

export default email