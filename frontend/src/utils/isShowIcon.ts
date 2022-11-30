/**
 * tezign ownership
 * @owner niuziyang
 * @team POC
 */
import getFileExtension from '@tezign/commons.js/functions/getFileExtension';
import getFileName from '@tezign/commons.js/functions/getFileName';

export default function isShowIcon(url?: string, name?: string) {
  if (!url) return true;
  const showImage = ['PNG', 'JPG', 'JPEG'];
  const filename = name || getFileName(url);
  const extension = getFileExtension(filename).toUpperCase();
  if (showImage.includes(extension)) {
    return false;
  }
  return true;
}
