import type {
  GetUrlParameterValueParameter,
  GetUrlParameterValueReturns,
  GetUrlParameterValueUrl,
  PrettyPrintData,
  PrettyPrintReturns,
  RemoveUrlParameterParameters,
  RemoveUrlParameterReturns,
  RemoveUrlParameterUrl,
} from '@/types/index.d.ts';

/**
 * Get url parameter value.
 *
 * @param {GetUrlParameterValueUrl}       url       - Url.
 * @param {GetUrlParameterValueParameter} parameter - Parameter.
 *
 * @returns {GetUrlParameterValueReturns}
 *
 * @since 1.0.0
 */
export function getUrlParameterValue(url: GetUrlParameterValueUrl, parameter: GetUrlParameterValueParameter): GetUrlParameterValueReturns {
  const urlObject = new URL(url);
  const urlParams = new URLSearchParams(urlObject.search);

  return urlParams.get(parameter);
}

/**
 * Pretty print.
 *
 * @param {PrettyPrintData} data - Data.
 *
 * @returns {PrettyPrintReturns}
 *
 * @since 1.0.0
 */
export function prettyPrint(data: PrettyPrintData): PrettyPrintReturns {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return null;
  }
}

/**
 * Remove url parameter.
 *
 * @param {RemoveUrlParameterUrl}        url        - Url.
 * @param {RemoveUrlParameterParameters} parameters - Parameters.
 *
 * @returns {RemoveUrlParameterReturns}
 *
 * @since 1.0.0
 */
export function removeUrlParameter(url: RemoveUrlParameterUrl, parameters: RemoveUrlParameterParameters): RemoveUrlParameterReturns {
  const urlObject = new URL(url);
  const urlParams = new URLSearchParams(urlObject.search);

  // Loop through the parameters, and delete them one by one.
  parameters.forEach((parameter) => {
    urlParams.delete(parameter);
  });

  urlObject.search = urlParams.toString();

  return urlObject.toString();
}
