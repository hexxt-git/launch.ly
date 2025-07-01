import Squares from "@/block/Backgrounds/Squares/Squares";

export function Hero() {
  return (
    <section className="min-h-screen mt-8">
      <div className="relative z-0 ">
   <Squares 
speed={0.2} 
squareSize={90}
direction='diagonal' 
borderColor='#fff'
hoverFillColor='#222'
/>
</div>
    </section>
  );
}
