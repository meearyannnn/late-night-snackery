export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient leading-tight">
            Your Midnight
            <br />
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              Cravings Delivered
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            From crispy chips to instant noodles, get your favorite snacks delivered 
            right to your hostel room in minutes!
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm md:text-base text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>⚡ Lightning Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>🍜 Fresh & Tasty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>💳 Easy Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};