/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @description
 * Performs a deep merge of two objects and their key:value pairs into a single object.
 * @param {Record<any, any>} leftObject Specifies the left object.
 * @param {Record<any, any>} rightObject Specifies the right object.
 * @param {Object} options
 * @param {string} options.priorityObject Specifies the object to take priority during merging and overriding values at identical keys.
 * @param {boolean} options.mergeArrays Specifies whether arrays should be merged or overriden by the array from the priorityObject.
 * @param {boolean} options.useStructuredClone Specifies whether to use the structuredClone() function to clone the object that is not priorityObject. True by default. If set to false, the function will mutate the object not set as priorityObject.
 * @returns {Record<any, any>}
 */

export function merge(
  leftObject: Record<any, any>,
  rightObject: Record<any, any>,
  options?: {
    priorityObject?: 'left' | 'right'
    useStructuredClone?: boolean
    mergeArrays?: boolean
  }
): Record<any, any> {
  let baseObject: Record<any, any>
  let overrideObject: Record<any, any>

  if (options?.priorityObject === 'left') {
    if (options?.useStructuredClone === false) {
      baseObject = rightObject
      overrideObject = leftObject
    } else {
      baseObject = structuredClone(rightObject)
      overrideObject = leftObject
    }
  } else {
    if (options?.useStructuredClone === false) {
      baseObject = leftObject
      overrideObject = rightObject
    } else {
      baseObject = structuredClone(leftObject)
      overrideObject = rightObject
    }
  }

  deepMerge(baseObject, overrideObject, options?.mergeArrays)

  return baseObject
}

function deepMerge(
  baseObject: Record<any, any>,
  overrideObject: Record<any, any>,
  mergeArrays: boolean | undefined
): Record<any, any> {
  Object.keys(overrideObject).map(key => {
    if (!baseObject[key]) {
      Object.keys(baseObject).push(key)
      baseObject[key] = {}
    }
    if (
      typeof overrideObject[key] === 'object' &&
      typeof baseObject[key] === 'object' &&
      !Array.isArray(overrideObject[key]) &&
      !Array.isArray(baseObject[key])
    ) {
      deepMerge(baseObject[key], overrideObject[key], mergeArrays)
      return
    }

    if (Array.isArray(baseObject[key]) && Array.isArray(overrideObject[key])) {
      if (mergeArrays !== false) {
        overrideObject[key].map((value: any) => {
          if (!baseObject[key].includes(value)) {
            baseObject[key].push(value)
          }
        })
        return
      }
    }
    baseObject[key] = overrideObject[key]
  })
  return baseObject
}
