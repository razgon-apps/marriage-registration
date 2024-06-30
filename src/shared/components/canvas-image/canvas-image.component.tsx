// import React, { useEffect, useRef } from 'react';
// import { Box } from '@mantine/core';
// import { IInfoForm } from 'app/store/info-form-store';
// import { useStyles } from './styles';
// interface CanvasImageProps {
//   formData: IInfoForm;
//   imageUrl: string;
//   onImageDrawn?: (data: { file: File; blob: Blob; base64: string }) => void;
// }
// export const CanvasImage: React.FC<CanvasImageProps> = ({
//   formData,
//   imageUrl,
//   onImageDrawn,
// }) => {
//   const { classes } = useStyles();
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas!.getContext('2d');
//     const image = new Image();
//     image.src = imageUrl;
//     image.onload = async () => {
//       ctx!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
//       ctx!.font = '9px Gilroy';
//       ctx!.fillStyle = 'black';
//       ctx!.fillText(formData?.groom?.surname ?? '', 85, 85);
//       ctx!.fillText(formData?.groom?.name ?? '', 85, 97);
//       ctx!.fillText(formData?.groom?.patronymic ?? '', 85, 108);
//       ctx!.fillText(formData?.groom?.citizenship ?? '', 85, 120);
//       ctx!.fillText(formData?.groom?.birthDate ?? '', 140, 133);
//       ctx!.fillText(formData?.bride?.surname ?? '', 85, 180);
//       ctx!.fillText(formData?.bride?.name ?? '', 85, 192);
//       ctx!.fillText(formData?.bride?.patronymic ?? '', 85, 203);
//       ctx!.fillText(formData?.bride?.citizenship ?? '', 85, 215);
//       ctx!.fillText(formData?.bride?.birthDate ?? '', 140, 228);
//       ctx!.fillText(formData?.registrationPlace ?? '', 125, 342);
//       if (onImageDrawn) {
//         const base64 = canvas!.toDataURL('image/jpeg', 0.95);
//         const blob = await new Promise<Blob>((resolve, reject) => {
//           canvas!.toBlob(
//             (blob) => {
//               if (blob) {
//                 resolve(blob);
//               } else {
//                 reject(new Error('Failed to create blob from canvas'));
//               }
//             },
//             'image/jpeg',
//             0.95,
//           );
//         });
//         const file = new File([blob], 'new-photo.jpeg', { type: 'image/jpeg' });
//         onImageDrawn({ file, blob, base64 });
//       }
//     };
//   }, [formData, imageUrl]);
//   return (
//     <Box>
//       <canvas ref={canvasRef} width={320} height={420}></canvas>
//     </Box>
//   );
// };
import React, { useEffect, useRef } from 'react';

import { Box } from '@mantine/core';

import { IInfoForm } from 'app/store/info-form-store';

import { useStyles } from './styles';

interface CanvasImageProps {
  formData: IInfoForm;
  imageUrl: string;
  onImageDrawn?: (data: { file: File; blob: Blob; base64: string }) => void;
}

export const CanvasImage: React.FC<CanvasImageProps> = ({
  formData,
  imageUrl,
  onImageDrawn,
}) => {
  const { classes } = useStyles();
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);
  const desktopCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawImage = (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      formData: IInfoForm,
      width: number,
      height: number,
    ) => {
      ctx.clearRect(0, 0, width, height); // Clear the canvas
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);

        ctx.font = `${(9 * width) / 320}px Gilroy`;
        ctx.fillStyle = 'black';

        ctx.fillText(
          formData?.groom?.surname ?? '',
          (85 * width) / 320,
          (85 * height) / 420,
        );
        ctx.fillText(
          formData?.groom?.name ?? '',
          (85 * width) / 320,
          (97 * height) / 420,
        );
        ctx.fillText(
          formData?.groom?.patronymic ?? '',
          (85 * width) / 320,
          (108 * height) / 420,
        );
        ctx.fillText(
          formData?.groom?.citizenship ?? '',
          (85 * width) / 320,
          (120 * height) / 420,
        );
        ctx.fillText(
          formData?.groom?.birthDate ?? '',
          (150 * width) / 320,
          (133 * height) / 420,
        );

        ctx.fillText(
          formData?.bride?.surname ?? '',
          (85 * width) / 320,
          (180 * height) / 420,
        );
        ctx.fillText(
          formData?.bride?.name ?? '',
          (85 * width) / 320,
          (192 * height) / 420,
        );
        ctx.fillText(
          formData?.bride?.patronymic ?? '',
          (85 * width) / 320,
          (203 * height) / 420,
        );
        ctx.fillText(
          formData?.bride?.citizenship ?? '',
          (85 * width) / 320,
          (215 * height) / 420,
        );
        ctx.fillText(
          formData?.bride?.birthDate ?? '',
          (150 * width) / 320,
          (228 * height) / 420,
        );

        ctx.fillText(
          formData?.registrationPlace ?? '',
          (125 * width) / 320,
          (342 * height) / 420,
        );

        if (width === 1000) {
          generateHighResImage(canvas);
        }
      };

      image.onerror = (error) => {
        console.error('Error loading image', error);
      };
    };

    const generateHighResImage = async (canvas: HTMLCanvasElement) => {
      const base64 = canvas.toDataURL('image/jpeg', 0.95);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob from canvas'));
            }
          },
          'image/jpeg',
          0.95,
        );
      });
      const file = new File([blob], 'new-photo.jpeg', { type: 'image/jpeg' });

      if (onImageDrawn) {
        onImageDrawn({ file, blob, base64 });
      }
    };

    const mobileCanvas = mobileCanvasRef.current;
    const mobileCtx = mobileCanvas!.getContext('2d');

    const desktopCanvas = desktopCanvasRef.current;
    const desktopCtx = desktopCanvas!.getContext('2d');

    if (mobileCanvas && mobileCtx) {
      drawImage(mobileCanvas, mobileCtx, formData, 320, 420);
    }

    if (desktopCanvas && desktopCtx) {
      drawImage(desktopCanvas, desktopCtx, formData, 1000, 1400);
    }
  }, [formData, imageUrl]);

  return (
    <Box>
      {/* Mobile Canvas for Display */}
      <canvas ref={mobileCanvasRef} width={320} height={420}></canvas>
      {/* Hidden Desktop Canvas for High-Resolution Image Generation */}
      <canvas
        ref={desktopCanvasRef}
        width={1000}
        height={1400}
        style={{ display: 'none' }}
      ></canvas>
    </Box>
  );
};
