import React, { useEffect, useRef } from 'react';

import { Box } from '@mantine/core';

import { IInfoForm } from 'app/store/info-form-store';

import { useStyles } from './styles';

interface CanvasImageProps {
  formData: IInfoForm;
  imageUrl: string;
}

export const CanvasImage: React.FC<CanvasImageProps> = ({
  formData,
  imageUrl,
}) => {
  const { classes } = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      ctx!.drawImage(image, 0, 0, canvas!.width, canvas!.height);

      ctx!.font = '9px Gilroy';
      ctx!.fillStyle = 'black';

      // Example of text positions
      ctx!.fillText(formData?.groom?.surname ?? '', 70, 85);
      ctx!.fillText(formData?.groom?.name ?? '', 85, 97);
      ctx!.fillText(formData?.groom?.patronymic ?? '', 112, 97);
      ctx!.fillText(formData?.groom?.citizenship ?? '', 85, 120);
      ctx!.fillText(formData?.groom?.birthDate ?? '', 140, 133);

      ctx!.fillText(formData?.bride?.surname ?? '', 70, 180);
      ctx!.fillText(formData?.bride?.name ?? '', 85, 192);
      ctx!.fillText(formData?.bride?.patronymic ?? '', 117, 192);
      ctx!.fillText(formData?.bride?.citizenship ?? '', 85, 215);
      ctx!.fillText(formData?.bride?.birthDate ?? '', 140, 228);

      ctx!.fillText(formData?.registrationPlace ?? '', 125, 342);
    };
  }, [formData, imageUrl]);

  return (
    <Box className={classes.root}>
      <canvas ref={canvasRef} width={300} height={420}></canvas>
    </Box>
  );
};
