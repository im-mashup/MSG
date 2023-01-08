import { NavigationBar } from '@/components/common';
import { ControlSection, GenerateLayout, PreviewSection } from '@/components/generate';
import type {
  PreviewBackgroundColor,
  PreviewSnack,
} from '@/components/generate/PreviewSection/PreviewSection.component';
import type { Platform } from '@/constants/platform';
import { RESULT_ROUTES } from '@/constants/route';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';

interface Params extends ParsedUrlQuery {
  platformName: Platform;
}

interface GeneratePageProps {
  platformName: Platform;
}

const GeneratePage: NextPage<GeneratePageProps> = () => {
  const [currentBackground, setCurrentBackground] = useState<PreviewBackgroundColor>('black50');
  const [currentSnack, setCurrentSnack] = useState<PreviewSnack>(null);
  const [talkMySelf, setTalkMySelf] = useState('');
  const [isVisibleTalkMySelf, setIsVisibleTalkMySelf] = useState(false);

  const selectedOptions = {
    background: currentBackground,
    snack: currentSnack ?? '',
    isVisibleTalkMySelf: isVisibleTalkMySelf.toString(),
    talkMySelf,
  };

  const router = useRouter();
  const platform = router.query.platformName as Platform;
  const selectedOptionParams = new URLSearchParams(selectedOptions).toString();
  const handleGoToResultPage = () => {
    router.push(`${RESULT_ROUTES[platform]}?${selectedOptionParams}`);
  };

  const handleBackToPrevPage = () => {
    router.back();
  };

  return (
    <>
      <NavigationBar
        rightButtonText="다음"
        backButtonEvent={handleBackToPrevPage}
        rightButtonEvent={handleGoToResultPage}
      />
      <GenerateLayout>
        <PreviewSection
          backgroundColor={currentBackground}
          snack={currentSnack}
          talkMySelf={talkMySelf}
          setTalkMySelf={setTalkMySelf}
          isVisibleTalkMySelf={isVisibleTalkMySelf}
        />
        <ControlSection
          currentBackground={currentBackground}
          currentSnack={currentSnack}
          isVisibleTalkMySelf={isVisibleTalkMySelf}
          setCurrentBackground={setCurrentBackground}
          setCurrentSnack={setCurrentSnack}
          setIsVisibleTalkMySelf={setIsVisibleTalkMySelf}
        />
      </GenerateLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [
      { params: { platformName: 'ios' } },
      { params: { platformName: 'web' } },
      { params: { platformName: 'android' } },
      { params: { platformName: 'spring' } },
      { params: { platformName: 'design' } },
      { params: { platformName: 'node' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<GeneratePageProps, Params> = async (context) => {
  const { platformName } = context.params!;

  return {
    props: {
      platformName,
    },
  };
};

export default GeneratePage;
