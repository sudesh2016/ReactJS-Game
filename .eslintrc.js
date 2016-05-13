module.exports = {
    extends: 'airbnb',
    rules: {
        indent: [2, 4, { 'SwitchCase': 1 }],
        'comma-dangle': [2, 'never'],
        'one-var': 0,
        'prefer-const': 0,
        'func-names': 0,
        'no-eval': 0
    },
    plugins: [
        'react'
    ]
};
