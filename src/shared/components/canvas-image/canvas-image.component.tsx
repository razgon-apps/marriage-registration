import React, { useEffect, useRef } from 'react';

import { Box } from '@mantine/core';

import bg1200 from 'app/public/img/background1200.png';
import storyButton from 'app/public/img/story-button.png';
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
      isDesktop: boolean,
    ) => {
      ctx.clearRect(0, 0, width, height);

      // Load background image
      const bgImage = new Image();
      bgImage.src = bg1200;

      bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, width, height);

        // Draw story button image for desktop version
        if (isDesktop) {
          const bgImage = new Image();
          bgImage.src = bg1200;

          bgImage.onload = () => {
            ctx.drawImage(bgImage, 0, 0, width, height);

            // Draw text for desktop version
            ctx.font = 'bold 80px Gilroy';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText('Первый онлайн ЗАГС', width / 2, 160);
            ctx.fillStyle = '#7DB8A4';
            ctx.fillText('во ВКонтакте!', width / 2, 250);
          };

          bgImage.onerror = (error) => {
            console.error('Error loading background image', error);
          };
        }

        // Draw main image
        const mainImage = new Image();
        mainImage.src = imageUrl;

        mainImage.onload = () => {
          const mainImageWidth = isDesktop ? 830 : width; // Изменяем размер основного изображения в зависимости от версии
          const mainImageHeight = isDesktop ? 1200 : height;
          const mainImageX = (width - mainImageWidth) / 2;
          const mainImageY = isDesktop ? 320 : 0;

          ctx.drawImage(
            mainImage,
            mainImageX,
            mainImageY,
            mainImageWidth,
            mainImageHeight,
          );

          // Draw text for both versions
          ctx.font = `${isDesktop ? 25 : 9}px Gilroy`; // Изменяем размер шрифта в зависимости от версии
          ctx.fillStyle = 'black';

          if (!isDesktop) {
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
          } else {
            ctx.fillText(
              formData?.groom?.surname ?? '',
              (125 * width) / width + 300,
              (85 * height) / height + 480,
            );
            ctx.fillText(
              formData?.groom?.name ?? '',
              (110 * width) / width + 300,
              (120 * height) / height + 480,
            );
            ctx.fillText(
              formData?.groom?.patronymic ?? '',
              (125 * width) / width + 300,
              (155 * height) / height + 480,
            );
            ctx.fillText(
              formData?.groom?.citizenship ?? '',
              (160 * width) / width + 300,
              (185 * height) / height + 480,
            );
            ctx.fillText(
              formData?.groom?.birthDate ?? '',
              (320 * width) / width + 300,
              (215 * height) / height + 480,
            );

            ctx.fillText(
              formData?.bride?.surname ?? '',
              (110 * width) / width + 300,
              (85 * height) / height + 750,
            );
            ctx.fillText(
              formData?.bride?.name ?? '',
              (110 * width) / width + 300,
              (120 * height) / height + 750,
            );
            ctx.fillText(
              formData?.bride?.patronymic ?? '',
              (110 * width) / width + 300,
              (155 * height) / height + 750,
            );
            ctx.fillText(
              formData?.bride?.citizenship ?? '',
              (160 * width) / width + 300,
              (185 * height) / height + 750,
            );
            ctx.fillText(
              formData?.bride?.birthDate ?? '',
              (320 * width) / width + 300,
              (215 * height) / height + 750,
            );
            ctx.fillText(
              formData?.registrationPlace ?? '',
              (290 * width) / width + 300,
              (215 * height) / height + 1080,
            );
          }

          // Draw story button image for desktop version
          if (isDesktop) {
            const localImage = new Image();
            localImage.src = storyButton;

            localImage.onload = () => {
              const storyButtonWidth = 915;
              const storyButtonHeight = 210;
              const storyButtonX = (width - storyButtonWidth) / 2;
              const storyButtonY = mainImageY + mainImageHeight + 100;

              ctx.drawImage(
                localImage,
                storyButtonX,
                storyButtonY,
                storyButtonWidth,
                storyButtonHeight,
              );

              generateHighResImage(canvas);
            };

            localImage.onerror = (error) => {
              console.error('Error loading local image', error);
              generateHighResImage(canvas);
            };
          } else {
            generateHighResImage(canvas);
          }
        };

        mainImage.onerror = (error) => {
          console.error('Error loading main image', error);
        };
      };

      bgImage.onerror = (error) => {
        console.error('Error loading background image', error);
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
      drawImage(mobileCanvas, mobileCtx, formData, 320, 420, false);
    }

    if (desktopCanvas && desktopCtx) {
      drawImage(desktopCanvas, desktopCtx, formData, 1100, 1900, true);
    }
  }, [formData, imageUrl]);

  return (
    <Box>
      {/* Mobile Canvas for Display */}
      <canvas ref={mobileCanvasRef} width={320} height={420}></canvas>
      {/* Hidden Desktop Canvas for High-Resolution Image Generation */}
      <canvas
        ref={desktopCanvasRef}
        width={1100}
        height={1900}
        style={{ display: 'none' }}
      ></canvas>
    </Box>
  );
};
