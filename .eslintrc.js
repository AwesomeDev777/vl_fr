module.exports = {
	plugins: ['@typescript-eslint'],
	env: {
		browser: true
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@next/next/recommended',
		'airbnb',
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'prettier'
	],
	parserOptions: {
		project: './tsconfig.json'
	},
	settings: {
		'import/resolver': {
			typescript: {}
		}
	},
	rules: {
		'import/prefer-default-export': 'off',
		'no-restricted-exports': 'off',
		'react/require-default-props': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 'off',
		'react/no-unstable-nested-components': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/media-has-caption': 'off',
		'@typescript-eslint/array-type': ['error', { default: 'array' }],
		'@typescript-eslint/no-unused-vars': ['error'],
		'func-names': 'off',
		'no-plusplus': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'typescript-eslint/no-explicit-any': 'off',
		'react/button-has-type': 'off',
		'no-underscore-dangle': 'off'
	}
}
