import { textEncodedSpace, textVariables } from './regex';
import type { GenerateBslLinkRequestType, GenerateBslLinkReturns, GenerateBslLinkUrl } from '@/types/linkgen.d.ts';

/**
 * Generate bsl link.
 *
 * @param {GenerateBslLinkRequestType} requestType - Request type.
 * @param {GenerateBslLinkUrl}         url         - Url.
 *
 * @returns {GenerateBslLinkReturns}
 *
 * @since 1.0.0
 */
export function generateBslLink(requestType: GenerateBslLinkRequestType, url: GenerateBslLinkUrl): GenerateBslLinkReturns {
  const urlRequestType = (requestType === 'POST') ? '//BSL_POST_REQ=' : '//BSL_GET_REQ=';
  const urlVariables = url
    .toString()
    .replace(textVariables, (_match, p1) => {
      const decoded = decodeURIComponent(p1);
      const replaced = decoded.replace(textEncodedSpace, ' ');

      return `{{${replaced}}}`;
    });

  return `${urlRequestType}${urlVariables}`;
}
