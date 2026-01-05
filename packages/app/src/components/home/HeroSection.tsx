import React from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckCircle, Zap, Eye, Shield, User, DollarSign, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import TextCarousel from '../common/TextCarousel';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  
  // Define rotating texts for the carousel
  const carouselTexts = [
    t('home.hero.carousel.text1'),
    t('home.hero.carousel.text2'),
    t('home.hero.carousel.text3'),
    t('home.hero.carousel.text4'),
    t('home.hero.carousel.text5')
  ];
  
  return (
    <section className="relative text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 min-h-screen hero-background"></div>
      
      {/* Dynamic Theme Overlay */}
      <div className="absolute inset-0 z-1 min-h-screen hero-overlay"></div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <div className="relative z-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              {t('home.hero.title_line1')} <br />
              {t('home.hero.title_line2')}
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto opacity-0 animate-fade-in-up animate-delay-300">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="text-xl text-gray-100 mb-10 max-w-4xl mx-auto opacity-0 animate-fade-in-up animate-delay-500">
              <div className="h-24 md:h-28 lg:h-32 flex items-center justify-center">
                <TextCarousel 
                  texts={carouselTexts}
                  interval={4000}
                  className="w-full h-full flex items-center justify-center"
                  textClassName="text-center leading-relaxed whitespace-pre-line"
                />
              </div>
            </div>
            
            {/* Trial Message */}
            {!isAuthenticated && (
              <div className="mb-6 opacity-0 animate-fade-in-up animate-delay-600">
                <p className="text-base md:text-lg text-gray-100">
                  <span className="font-semibold">14-day free trial</span> - No credit card required
                </p>
              </div>
            )}
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 opacity-0 animate-fade-in-up animate-delay-700">
              {!isAuthenticated ? (
                <>
                  <Link to="/signin?redirect=/dashboard">
                    <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-green hover:bg-gray-100 hover:scale-105 transition-all duration-300 hover:shadow-lg flex items-center justify-center w-full sm:w-auto">
                      <User className="h-5 w-5 mr-2" />
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/supply-chain-assessment">
                    <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                      <Target className="h-5 w-5 mr-2" />
                      Start Assessment
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                      <DollarSign className="h-5 w-5 mr-2" />
                      View Pricing
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/supply-chain-assessment">
                  <Button variant="secondary" size="lg" className="bg-white text-vendorsoluce-green hover:bg-gray-100 hover:scale-105 transition-all duration-300 hover:shadow-lg flex items-center justify-center">
                    <Target className="h-5 w-5 mr-2" />
                    {t('home.hero.cta1')}
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Secondary Quick Links */}
            {!isAuthenticated && (
              <div className="flex flex-wrap justify-center gap-3 mb-8 opacity-0 animate-fade-in-up animate-delay-800">
                <Link to="/tools/vendor-risk-calculator" className="text-sm text-gray-200 hover:text-white underline transition-colors">
                  Try Free Tools
                </Link>
                <span className="text-gray-400">•</span>
                <Link to="/how-it-works" className="text-sm text-gray-200 hover:text-white underline transition-colors">
                  How It Works
                </Link>
                <span className="text-gray-400">•</span>
                <Link to="/contact" className="text-sm text-gray-200 hover:text-white underline transition-colors">
                  Schedule Demo
                </Link>
              </div>
            )}
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 opacity-0 animate-fade-in-up animate-delay-900 hover:bg-white/15 hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-yellow-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.hero.benefits.section1.title')}</h3>
                <div className="text-gray-100 text-m space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section1.benefit1')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section1.benefit2')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section1.benefit3')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 opacity-0 animate-fade-in-up animate-delay-1100 hover:bg-white/15 hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer">
                <div className="flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.hero.benefits.section2.title')}</h3>
                <div className="text-gray-100 text-m space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section2.benefit1')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section2.benefit2')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section2.benefit3')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 opacity-0 animate-fade-in-up animate-delay-1300 hover:bg-white/15 hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.hero.benefits.section3.title')}</h3>
                <div className="text-gray-100 text-m space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section3.benefit1')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section3.benefit2')}</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                    <span>{t('home.hero.benefits.section3.benefit3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;