import { useCallback, useState } from "react";
import HomepageContent from "@/components/home/HomepageContent";
import Preloader from "@/components/home/Preloader";

export default function App() {
  const [intro, setIntro] = useState(true);
  const finish = useCallback(() => setIntro(false), []);

  return (
    <>
      <HomepageContent introFinished={!intro} />
      {intro && <Preloader onDone={finish} />}
    </>
  );
}
