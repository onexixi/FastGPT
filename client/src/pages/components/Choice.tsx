import { Box, Image, Flex, Grid, useTheme } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'next-i18next';
import MyTooltip from '@/components/MyTooltip';
import { feConfigs } from '@/store/static';

const Choice = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box>
      <Box
        className="textlg"
        py={['30px', '60px']}
        textAlign={'center'}
        fontSize={['22px', '30px']}
        fontWeight={'bold'}
      >
        {t('MIGPT', { title: feConfigs?.systemTitle })}
      </Box>
      <Grid px={[5, 0]} gridTemplateColumns={['1fr', `1fr 1fr`, 'repeat(3,1fr)']} gridGap={6}>
      </Grid>
    </Box>
  );
};

export default Choice;
