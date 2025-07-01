import Squares from "@/block/Backgrounds/Squares/Squares";
import { ContainerScroll } from "@/components/ui/container-screll-animation";

export function Hero() {
  return (
    <section className="h-screen mt-8 relative w-full">
      <div className="absolute inset-0">
   <Squares 
speed={0.2} 
squareSize={35}
direction='diagonal' 
borderColor='#fff'
hoverFillColor='#222'

/>
      </div>
      <div>
             <ContainerScroll
                titleComponent={
                  <>
                    <div className="mb-5 inline-block ">
                      <h1 className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#999999]" style={{ letterSpacing: '0.1em' }}>
                        Launch Your Next Big Idea <br />
                        with AI-Powered Precision.
                      </h1>
                      <h3>
                        Access intelligent tools for ideation, business modeling, market analysis, and strategic <br />
                        execution, designed to bring your projects to life with confidence
                      </h3>
                    </div>
                  </>
                }
              >
                <img
                  src={`../assets/container.png`}
                  alt="hero"
                  height={720}
                  width={1400}
                  className="mx-auto mt-10 rounded-2xl object-cover h-full object-left-top"
                  draggable={false}
                />
              </ContainerScroll>
      </div>

    </section>
  );
}
