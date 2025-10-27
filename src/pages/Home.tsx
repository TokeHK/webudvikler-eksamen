import HTitle from "../components/textComponents/HTitle";
import STitle from "../components/textComponents/STitle"
import TextContent from "../components/textComponents/TextContent";

export default function Home() {
  return <>
    <HTitle text={"Welcome to the Home Page"} className="" id="FrontPageTitle"/>
    <STitle text={"Section Title"} id="example_newsletter" className="text-blue-600" />
    <TextContent text1={"asdf"} text2="test" text3="aaaa" text4="1234" className="border-red-600 border-2"/>
  </>
}