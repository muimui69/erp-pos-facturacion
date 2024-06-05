import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';

import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';


import { Icons } from '../../../../components/icons';
import { Button } from '@/components/ui/button';


export default function CongratCard() {
  return (
    <div className="flex justify-center items-center h-screen">
 
      <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: 343,
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
      }}
    >
      <CardOverflow variant="solid"  sx={{ bgcolor: 'black' }}>
        <AspectRatio
          variant="outlined"
          
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            position: 'relative',
          }}
        >
          <div>
          <Icons.confirmation size="100%" color="#229d20" strokeWidth={3} />
     
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        🎊 Bienvenido a PoinSync 🎊
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
        ¡Gracias por unirte a Poinsync! Estamos emocionados de tenerte como parte de nuestra comunidad. Con tu membresía,
          tendrás acceso a una variedad de características y beneficios exclusivos diseñados para ayudarte a gestionar tu empresa
          de manera eficiente y efectiva.
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
        <Button variant="outline">Siguiente</Button>
      </CardActions>
    </Card>
 
    </div>
  );
}