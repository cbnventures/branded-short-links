/**
 * Text bsl get req.
 *
 * @since 1.0.0
 */
export const textBslGetReq = /^(\/\/BSL_GET_REQ=)(.+)$/;

/**
 * Text bsl post req.
 *
 * @since 1.0.0
 */
export const textBslPostReq = /^(\/\/BSL_POST_REQ=)(.+)$/;

/**
 * Text gtm container id.
 *
 * @since 1.0.0
 */
export const textGtmContainerId = /^GTM-[A-Z0-9]+$/;

/**
 * Text img src.
 *
 * @since 1.0.0
 */
export const textImgSrc = /<img[^>]*\ssrc="([^"]*)"/g;

/**
 * Text parenthesis left.
 *
 * @since 1.0.0
 */
export const textParenthesisLeft = /\(/g;

/**
 * Text parenthesis right.
 *
 * @since 1.0.0
 */
export const textParenthesisRight = /\)/g;
