// src/store/hooks/useSelector.js

import { useSelector as useReduxSelector } from 'react-redux'

const useSelector = (selector) => useReduxSelector(selector)

export default useSelector
