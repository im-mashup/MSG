import { color } from '@/styles/theme/color';
import { toPng } from 'html-to-image';
import { RefObject, useCallback } from 'react';
import useWebShare from './useWebShare';

const useDownloadElementToImage = <T extends HTMLElement>(ref: RefObject<T>, filename: string) => {
  const { isSupported, share } = useWebShare();

  const saveImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, {
      cacheBust: true,
      width: 480,
      height: 720,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: color.black,
      },
    })
      .then(async (dataUrl) => {
        if (isSupported) {
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          const file = new File([blob], filename, { type: blob.type });

          share({ files: [file] });
        } else {
          const link = document.createElement('a');
          link.download = filename;
          link.href = dataUrl;

          link.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, isSupported, filename, share]);

  return { saveImage };
};

export default useDownloadElementToImage;
