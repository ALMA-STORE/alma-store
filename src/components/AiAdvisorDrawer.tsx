import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { translations, getProductTitle, formatPrice } from '../i18n/translations';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedProductIds?: string[];
}

export const AiAdvisorDrawer: React.FC = () => {
  const {
    isAiDrawerOpen,
    setIsAiDrawerOpen,
    language,
    products,
    setSelectedProductId,
  } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text:
        language === 'ar'
          ? 'مرحباً بك في ألما ستور! أنا مستشارك الذكي الشخصي للفخامة والأزياء. كيف يمكنني مساعدتك في اختيار الساعات، العطور، أو التنسيقات اليوم؟'
          : language === 'fr'
          ? 'Bienvenue chez ALMA STORE! Je suis votre conseiller personnel en luxe et mode. Comment puis-je vous aider aujourd’hui?'
          : 'Welcome to ALMA STORE! I am your personal AI luxury concierge. How may I assist you with horology, royal fragrances, or Italian couture today?',
    },
  ]);

  if (!isAiDrawerOpen) return null;

  const t = translations[language];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: userText, contextProducts: products, language }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply,
            recommendedProductIds: data.recommendedProductIds,
          },
        ]);
      } else {
        throw new Error('Fallback logic');
      }
    } catch {
      // Fallback recommendation logic
      let replyText = '';
      let recs: string[] = [];

      const lower = userText.toLowerCase();
      if (lower.includes('حامل') || lower.includes('سيارة') || lower.includes('support') || lower.includes('holder')) {
        const items = products.filter((p) => p.categorySlug === 'support-telephone-voiture');
        recs = items.map((i) => i.id);
        replyText =
          language === 'ar'
            ? 'أنصحك بحوامل الهواتف للسيارات لدينا مثل الحامل المغناطيسي 360° أو الحامل الأوتوماتيكي بالشاحن اللاسلكي 15W.'
            : 'I recommend our car phone mounts such as the Magnetic 360° Mount or the 15W Wireless Charging Mount.';
      } else if (lower.includes('ساعة') || lower.includes('watch') || lower.includes('montre')) {
        const watches = products.filter((p) => p.categorySlug === 'montres-homme' || p.categorySlug === 'montres-femme');
        recs = watches.map((w) => w.id);
        replyText =
          language === 'ar'
            ? 'إليك تشكيلتنا الممتازة من الساعات الرجالية والنسائية ذات التصاميم الأنيقة.'
            : 'Explore our luxury collection of men\'s and women\'s timepieces.';
      } else if (lower.includes('سوار') || lower.includes('bracelet') || lower.includes('سلسلة') || lower.includes('salassil')) {
        const jewelry = products.filter((p) => p.categorySlug === 'bracelets' || p.categorySlug === 'salassil');
        recs = jewelry.map((j) => j.id);
        replyText =
          language === 'ar'
            ? 'إليك تشكيلة الأساور والسلاسل المميزة المصممة بعناية فائقة.'
            : 'Check out our curated bracelets and Salassil necklaces.';
      } else if (lower.includes('مروحة') || lower.includes('fan') || lower.includes('ventilateur')) {
        const fans = products.filter((p) => p.categorySlug === 'portable-mini-fans');
        recs = fans.map((f) => f.id);
        replyText =
          language === 'ar'
            ? 'مراوح الصيف المحمولة التوربو لدينا تمنحك تبريداً فورياً ومريحاً أينما كنت!'
            : 'Our portable summer mini fans offer instant cooling on the go!';
      } else if (lower.includes('موتو') || lower.includes('moto') || lower.includes('خوذة') || lower.includes('helmet') || lower.includes('قفاز')) {
        const moto = products.filter((p) => p.categorySlug === 'motorcycle-accessories');
        recs = moto.map((m) => m.id);
        replyText =
          language === 'ar'
            ? 'إليك أفضل مستلزمات وإكسسوارات الدراجات النارية والخوذات والجانتات المعتمدة.'
            : 'Check out our top-grade motorcycle helmets, gloves, and riding gear.';
      } else if (lower.includes('gps') || lower.includes('تتبع') || lower.includes('tracker') || lower.includes('أمان')) {
        const gps = products.filter((p) => p.categorySlug === 'gps-car-security');
        recs = gps.map((g) => g.id);
        replyText =
          language === 'ar'
            ? 'تفضل باكتشاف أجهزة التتبع GPS وأنظمة الأمان والحماية للسيارات والدراجات النارية.'
            : 'Discover our advanced GPS trackers and car security anti-theft systems.';
      } else if (lower.includes('محول') || lower.includes('adapter') || lower.includes('usb') || lower.includes('hub') || lower.includes('connect')) {
        const adapters = products.filter((p) => p.categorySlug === 'adapters-connectivity');
        recs = adapters.map((a) => a.id);
        replyText =
          language === 'ar'
            ? 'إليك أفضل المحولات والتوصيلات ووصلات USB-C والـ Hubs لتوصيل كافة أجهزتك بكفاءة.'
            : 'Explore our comprehensive selection of USB-C adapters, hubs, and connectors.';
      } else if (lower.includes('مفتاح') || lower.includes('key') || lower.includes('clé')) {
        const keys = products.filter((p) => p.categorySlug === 'car-key-accessories');
        recs = keys.map((k) => k.id);
        replyText =
          language === 'ar'
            ? 'إليك تشكيلة أغطية وحافظات مفاتيح السيارات المصنوعة من السليكون والجلد الفاخر.'
            : 'Check out our silicone, leather, and TPU car key protection cases.';
      } else {
        recs = [products[0]?.id, products[1]?.id].filter(Boolean);
        replyText =
          language === 'ar'
            ? 'بناءً على طلبك، إليك بعض المنتجات الأكثر مبيعاً وتقييماً في تشكيلة ألما ستور.'
            : 'Based on your preference, here are some of our top-rated bestseller pieces from ALMA STORE.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: replyText,
          recommendedProductIds: recs,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={() => setIsAiDrawerOpen(false)} />

        <motion.div
          initial={{ x: language === 'ar' ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: language === 'ar' ? '100%' : '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed inset-y-0 ${
            language === 'ar' ? 'right-0' : 'left-0'
          } max-w-full w-full sm:w-96 bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col z-50 text-white`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t.aiAdvisor}</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase">
                    PRO 2026
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  {language === 'ar' ? 'مستشارك الشخصي للفخامة' : 'Personal Luxury Concierge'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAiDrawerOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[80%] space-y-2">
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none'
                        : 'bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommended Products Mini Cards */}
                  {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        {language === 'ar' ? 'المنتجات المقترحة لك:' : 'Recommended Products:'}
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.recommendedProductIds.map((pid) => {
                          const item = products.find((p) => p.id === pid);
                          if (!item) return null;
                          const title = getProductTitle(item, language);
                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                setSelectedProductId(item.id);
                                setIsAiDrawerOpen(false);
                              }}
                              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all flex items-center gap-2.5 group"
                            >
                              <img
                                src={item.image}
                                alt={title}
                                className="w-10 h-10 object-cover rounded-lg bg-slate-900 border border-slate-800"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-[11px] font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                                  {title}
                                </h5>
                                <span className="text-[10px] font-extrabold text-amber-400">
                                  {formatPrice(item.price, language)}
                                </span>
                              </div>
                              {language === 'ar' ? (
                                <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                              ) : (
                                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-400 animate-pulse p-2">
                <Bot className="w-4 h-4" />
                <span>
                  {language === 'ar' ? 'جارٍ تحليل واستخلاص التوصيات...' : 'Analyzing preferences...'}
                </span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950 flex gap-2">
            <input
              type="text"
              placeholder={
                language === 'ar' ? 'اسأل عن تنسيق، هدية، أو عطر...' : 'Ask about styling, gifts, watches...'
              }
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
