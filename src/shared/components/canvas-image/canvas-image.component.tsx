import React, { useEffect, useRef } from 'react';

import { IInfoForm } from 'app/store/info-form-store';

interface CanvasImageProps {
  formData: IInfoForm;
  imageUrl: string;
}

export const CanvasImage: React.FC<CanvasImageProps> = ({
  formData,
  imageUrl,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      ctx!.drawImage(image, 0, 0, canvas!.width, canvas!.height);

      ctx!.font = '20px Arial';
      ctx!.fillStyle = 'black';

      // Example of text positions
      ctx!.fillText(formData?.surname ?? '', 100, 100);
      ctx!.fillText(formData.name, 100, 140);
      ctx!.fillText(formData.patronymic, 100, 180);
      ctx!.fillText(formData.citizenship, 100, 220);
      ctx!.fillText(formData.birthDate, 100, 260);
      ctx!.fillText(formData.birthPlace, 100, 300);
      ctx!.fillText(formData.spouseSurname, 100, 340);
      ctx!.fillText(formData.spouseName, 100, 380);
      ctx!.fillText(formData.spousePatronymic, 100, 420);
      ctx!.fillText(formData.spouseCitizenship, 100, 460);
      ctx!.fillText(formData.spouseBirthDate, 100, 500);
      ctx!.fillText(formData.spouseBirthPlace, 100, 540);
      ctx!.fillText(formData.marriageDate, 100, 580);
    };
  }, [formData, imageUrl]);

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};
