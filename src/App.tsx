import React, { useState, useMemo } from "react";
import { 
  Search, 
  Sparkles, 
  RotateCcw, 
  Info, 
  Egg, 
  Plus, 
  Check, 
  BookOpen, 
  Award, 
  X, 
  MapPin, 
  HelpCircle, 
  Flame, 
  Wind, 
  ArrowRight,
  Scale,
  MinusCircle,
  Hash,
  Heart,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { breedData, glossaryTerms, quizQuestions, Breed, GlossaryTerm } from "./breeds";

export default function App() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVibe, setSelectedVibe] = useState<string>("all");
  const [selectedEggColor, setSelectedEggColor] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "eggs">("name");

  // Selected breed for deep view modal
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

  // States for breed comparison list (maximum 3 breeds at a time)
  const [comparisonList, setComparisonList] = useState<Breed[]>([]);

  // Navigation tab state ("dictionary" | "quiz" | "glossary")
  const [activeTab, setActiveTab] = useState<"dictionary" | "quiz" | "glossary">("dictionary");

  // Quiz States
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizMatches, setQuizMatches] = useState<Breed[]>([]);

  // Glossary filter search state
  const [glossarySearch, setGlossarySearch] = useState("");
  const [activeGlossaryCategory, setActiveGlossaryCategory] = useState<string>("All");

  // Egg color selection quick filters
  const uniqueEggColors = useMemo(() => {
    // Standardized simplified egg categories
    return ["Cream", "White", "Brown", "Chocolate", "Blue", "Green"];
  }, []);

  const getShorthandEggCategory = (colorStr: string): string => {
    const lower = colorStr.toLowerCase();
    if (lower.includes("blue") && lower.includes("green")) return "Blue"; // Easter Egger
    if (lower.includes("blue")) return "Blue";
    if (lower.includes("green")) return "Green";
    if (lower.includes("chocolate") || lower.includes("reddish brown") || lower.includes("dark")) return "Chocolate";
    if (lower.includes("brown") || lower.includes("pinkish")) return "Brown";
    if (lower.includes("cream")) return "Cream";
    return "White";
  };

  // Filtered Breeds
  const filteredBreeds = useMemo(() => {
    return breedData
      .filter((breed) => {
        const matchesSearch = 
          breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          breed.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          breed.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          breed.longDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          breed.temperament.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesVibe = selectedVibe === "all" || breed.vibe === selectedVibe;
        
        const breedEggCat = getShorthandEggCategory(breed.eggColor);
        const matchesEggColor = selectedEggColor === "all" || breedEggCat === selectedEggColor;

        const matchesSize = selectedSize === "all" || breed.size === selectedSize;

        return matchesSearch && matchesVibe && matchesEggColor && matchesSize;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          // Sort by relative egg production count
          const eggVal = (p: string) => {
            if (p.includes("Superb")) return 4;
            if (p.includes("Excellent")) return 3;
            if (p.includes("Moderate")) return 2;
            return 1;
          };
          return eggVal(b.eggProduction) - eggVal(a.eggProduction);
        }
      });
  }, [searchTerm, selectedVibe, selectedEggColor, selectedSize, sortBy]);

  // Handle comparison selection
  const toggleComparison = (breed: Breed) => {
    if (comparisonList.some((b) => b.id === breed.id)) {
      setComparisonList(comparisonList.filter((b) => b.id !== breed.id));
    } else {
      if (comparisonList.length >= 3) {
        // Limit to 3 breeds
        alert("You can compare up to 3 chicken breeds at a time!");
        return;
      }
      setComparisonList([...comparisonList, breed]);
    }
  };

  const removeAllComparison = () => {
    setComparisonList([]);
  };

  // Start / Reset Quiz
  const startQuiz = () => {
    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setQuizMatches([]);
    setActiveTab("quiz");
  };

  // Handle choice selection in Quiz
  const handleQuizChoice = (questionId: number, value: string) => {
    const updatedAnswers = { ...quizAnswers, [questionId]: value };
    setQuizAnswers(updatedAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finished! Calculate results
      setQuizFinished(true);
      calculateQuizMatches(updatedAnswers);
    }
  };

  // Match calculator
  const calculateQuizMatches = (answers: Record<number, string>) => {
    // Count frequencies of chosen vibes
    const vibeCounts: Record<string, number> = {
      friendly: 0,
      independent: 0,
      showy: 0,
      utility: 0,
      "gentle-giant": 0
    };

    Object.values(answers).forEach((val) => {
      if (vibeCounts[val] !== undefined) {
        vibeCounts[val] += 1;
      }
    });

    // Score all breeds based on matching vibes and traits
    const scoredBreeds = breedData.map((breed) => {
      let score = 0;
      
      // Points for matching preferred vibe
      score += (vibeCounts[breed.vibe] || 0) * 10;

      // Check key question alignments, e.g. question 1 corresponds directly to vibe
      // Question 2 (space):
      const spaceAns = answers[2];
      if (spaceAns === "friendly" && breed.size === "Bantam") score += 5;
      if (spaceAns === "independent" && breed.foraging === "Excellent") score += 5;
      if (spaceAns === "gentle-giant" && breed.size === "Giant") score += 5;
      if (spaceAns === "showy" && breed.vibe === "showy") score += 5;

      // Question 3 (weather):
      const weatherAns = answers[3];
      if (weatherAns === "gentle-giant" && breed.hardiness === "Cold Hardy") score += 4;
      if (weatherAns === "independent" && breed.hardiness === "Heat Tolerant") score += 4;
      if (weatherAns === "utility" && breed.hardiness === "All-Weather Hardy") score += 5;

      // Question 4 (noise):
      const noiseAns = answers[4];
      if (noiseAns === "friendly" && breed.noiseLevel === "Whisper Quiet") score += 6;
      if (noiseAns === "independent" && breed.noiseLevel === "Vocal & Chatty") score += 4;

      return { breed, score };
    });

    // Sort by highest score and take top 3
    const topMatches = scoredBreeds
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.breed);

    setQuizMatches(topMatches);
  };

  // Glossary query
  const filteredGlossary = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchesSearch = 
        term.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        term.definition.toLowerCase().includes(glossarySearch.toLowerCase());
      const matchesCat = activeGlossaryCategory === "All" || term.category === activeGlossaryCategory;
      return matchesSearch && matchesCat;
    });
  }, [glossarySearch, activeGlossaryCategory]);

  return (
    <div className="glass-bg text-stone-800 min-h-screen font-sans flex flex-col antialiased">
      {/* Top Banner / Navigation Header */}
      <header className="glass sticky top-4 z-40 transition-all rounded-3xl mx-4 my-3 max-w-7xl lg:mx-auto">
        <div className="px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("dictionary")}>
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shadow-xs">
              <span className="text-2xl select-none">🥚</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-1">
                Cluck<span className="text-orange-500 font-serif italic">Pedia</span>
              </h1>
              <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
                The Chicken Dictionary • Est. 2026
              </span>
            </div>
          </div>

          {/* Quick Stats Panel inline */}
          <div className="hidden lg:flex items-center gap-4 bg-white/40 px-4 py-1.5 rounded-full border border-white/60 text-xs text-amber-950 font-semibold shadow-xs">
            <span className="flex items-center gap-1">🐓 <strong className="text-orange-600">{breedData.length}</strong> Breeds</span>
            <span className="h-3 w-px bg-white/60"></span>
            <span className="flex items-center gap-1">🥚 <strong className="text-orange-600">6</strong> Egg Shades</span>
            <span className="h-3 w-px bg-white/60"></span>
            <span className="flex items-center gap-1">📚 <strong className="text-orange-600">{glossaryTerms.length}</strong> Terms</span>
          </div>

          {/* Tab Selection Navigation */}
          <nav className="flex items-center bg-white/20 backdrop-blur-md p-1 rounded-xl border border-white/40 max-w-sm w-full md:w-auto shadow-xs">
            <button
              onClick={() => setActiveTab("dictionary")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "dictionary"
                  ? "bg-white/70 text-orange-600 shadow-sm font-bold border border-white/50"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              📖 Dictionary
            </button>
            <button
              id="quiz-nav-button"
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "quiz"
                  ? "bg-orange-500 text-white shadow-xs font-bold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              🎯 Breed Quiz
            </button>
            <button
              onClick={() => setActiveTab("glossary")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "glossary"
                  ? "bg-white/70 text-orange-600 shadow-xs font-bold border border-white/50"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              📚 Glossary
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex-1 w-full gap-8">
        
        {/* Dynamic Display based on Selected Navigation Tab */}
        <AnimatePresence mode="wait">
          
          {/* DICTIONARY TAB */}
          {activeTab === "dictionary" && (
            <motion.div
              key="dictionary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Eye-catching Hero Area */}
              <div className="bg-gradient-to-r from-orange-600/90 via-orange-550/85 to-amber-950/95 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden backdrop-blur-md border border-white/20">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none text-[15rem] leading-none translate-x-12 translate-y-12">
                  🐓
                </div>
                <div className="max-w-2xl relative z-10 space-y-4">
                  <span className="bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
                    🐔 Chicken-Lady Certified Dictionary
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight">
                    Find and Compare the Perfect Breed for Your Flock
                  </h2>
                  <p className="text-orange-50/90 text-sm sm:text-base leading-relaxed font-sans">
                    Whether you are searching for maximum chocolate brown egg production, ultra-affectionate lap companions for small children, or fluffy rockstar crests to beautify your garden, explore detailed profiles on the world's most beloved chicken types.
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={startQuiz}
                      className="bg-white hover:bg-orange-50 text-orange-650 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-orange-600" /> Learn What Breed You Are!
                    </button>
                    <a
                      href="#glossary"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("glossary");
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all border border-white/10 flex items-center gap-1.5"
                    >
                      <BookOpen className="w-4 h-4" /> Browse Glossary Terms
                    </a>
                  </div>
                </div>
              </div>

              {/* Egg Color Picker Filter Block */}
              <div className="glass-card p-6 rounded-3xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🥚</span>
                  <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase font-sans">
                    Egg Color Filter Guide
                  </h3>
                </div>
                <p className="text-xs text-stone-500 pb-1 font-sans">
                  Click on an egg shade below to instantly filter chicken breeds that lay that spectacular color:
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <button
                    onClick={() => setSelectedEggColor("all")}
                    className={`px-3 py-3.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      selectedEggColor === "all"
                        ? "bg-orange-500 text-white border-orange-600 shadow-sm"
                        : "bg-white/35 text-stone-700 border-white/50 hover:bg-white/60"
                    }`}
                  >
                    <span>🌈</span>
                    <span>All Eggs</span>
                  </button>
                  {[
                    { label: "White", emoji: "🥚", bgClass: "bg-white/70", textClass: "text-stone-700", borderClass: "border-white/60" },
                    { label: "Cream", emoji: "🥯", bgClass: "bg-orange-50/50", textClass: "text-amber-900", borderClass: "border-orange-100" },
                    { label: "Brown", emoji: "🍩", bgClass: "bg-amber-100/50", textClass: "text-amber-950", borderClass: "border-amber-200" },
                    { label: "Chocolate", emoji: "🍫", bgClass: "bg-amber-800/15", textClass: "text-amber-950", borderClass: "border-amber-700/20" },
                    { label: "Blue", emoji: "💎", bgClass: "bg-sky-100/50", textClass: "text-sky-850", borderClass: "border-sky-200" },
                    { label: "Green", emoji: "🍏", bgClass: "bg-emerald-100/50", textClass: "text-emerald-850", borderClass: "border-emerald-200" }
                  ].map((egg) => (
                    <button
                      key={egg.label}
                      onClick={() => setSelectedEggColor(egg.label)}
                      className={`px-2 py-3.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        selectedEggColor === egg.label
                          ? "bg-orange-500 text-white border-orange-600 shadow-sm"
                          : `${egg.bgClass} ${egg.textClass} ${egg.borderClass} hover:border-orange-400 hover:ring-2 hover:ring-orange-200/50`
                      }`}
                    >
                      <span className="text-base leading-none">{egg.emoji}</span>
                      <span>{egg.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Controls & Search Section */}
              <div id="dictionary-controls" className="glass-card p-6 rounded-3xl space-y-4">
                
                {/* Top Row: Search Box & Reset Filters */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="relative w-full flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search breeds by name, origin, personality (e.g. Silkie, Blue eggs, Cuddly)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-white/60 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 bg-white/40 text-stone-800 text-sm font-semibold placeholder:text-stone-400/80 transition-all focus:bg-white/70"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <select
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}
                      className="w-full md:w-44 px-3 py-2.5 border border-white/60 rounded-xl text-xs sm:text-xs font-bold text-stone-700 bg-white/45 cursor-pointer backdrop-blur-md focus:outline-hidden focus:bg-white/70"
                    >
                      <option value="name">Sort: Alphabetical (A-Z)</option>
                      <option value="eggs">Sort: Superb Egg Layer First</option>
                    </select>

                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedVibe("all");
                        setSelectedEggColor("all");
                        setSelectedSize("all");
                        setSortBy("name");
                      }}
                      className="px-3.5 py-2.5 border border-white/50 rounded-xl text-stone-600 bg-white/30 hover:text-orange-600 hover:bg-white/70 transition-all flex items-center justify-center gap-1 text-xs font-semibold whitespace-nowrap cursor-pointer hover:border-orange-200"
                      title="Reset all filters"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Row: Advanced Quick Pills Filters */}
                <div className="pt-2 border-t border-white/40 flex flex-wrap gap-y-3 gap-x-6 items-center text-xs">
                  
                  {/* Vibe Filter */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">Vibe:</span>
                    <button
                      onClick={() => setSelectedVibe("all")}
                      className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                        selectedVibe === "all"
                          ? "bg-orange-500 text-white shadow-xs border border-orange-600/30"
                          : "bg-white/35 text-stone-600 hover:bg-white/60 border border-white/50"
                      }`}
                    >
                      All
                    </button>
                    {[
                      { key: "friendly", label: "💖 Friendly Companion" },
                      { key: "utility", label: "🍳 Dependable Utility" },
                      { key: "independent", label: "🌿 Independent Forager" },
                      { key: "gentle-giant", label: "🏰 Majestic Giant" },
                      { key: "showy", label: "👑 Ornamental Show" }
                    ].map((v) => (
                      <button
                        key={v.key}
                        onClick={() => setSelectedVibe(v.key)}
                        className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap ${
                          selectedVibe === v.key
                            ? "bg-orange-500 text-white shadow-xs border border-orange-600/30"
                            : "bg-white/35 text-stone-600 hover:bg-white/60 border border-white/50"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>

                  {/* Size Filter */}
                  <div className="flex items-center gap-2 flex-wrap ml-auto md:ml-0">
                    <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">Size:</span>
                    <button
                      onClick={() => setSelectedSize("all")}
                      className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                        selectedSize === "all"
                          ? "bg-orange-500 text-white shadow-xs border border-orange-600/30"
                          : "bg-white/35 text-stone-600 hover:bg-white/60 border border-white/50"
                      }`}
                    >
                      All Sizes
                    </button>
                    {["Bantam", "Standard", "Giant"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                          selectedSize === size
                            ? "bg-orange-500 text-white shadow-xs border border-orange-600/30"
                            : "bg-white/35 text-stone-600 hover:bg-white/60 border border-white/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                </div>
              </div>

              {/* Comparison Drawer / Nest Bar Pin (If any breeds are being compared) */}
              {comparisonList.length > 0 && (
                <div className="glass rounded-3xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-white/60 text-stone-850 animate-bounce-subtle">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🥚</span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-gray-800">
                        Egg Comparison Nest ({comparisonList.length}/3)
                      </h4>
                      <p className="text-xs text-stone-600 font-semibold">
                        Compare breed size, temperament, egg count, and hardiness side-by-side.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {comparisonList.map((breed) => (
                      <div
                        key={breed.id}
                        className="bg-white/55 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-white/70 shadow-sm font-bold text-stone-800"
                      >
                        <span>🐔 {breed.name}</span>
                        <button
                          onClick={() => toggleComparison(breed)}
                          className="hover:text-red-500 text-stone-500 p-0.5 cursor-pointer"
                          title="Remove breed"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        // Open direct modal-like screen below or slide down
                        // Better: scroll to comparative view or render inline comparative dashboard!
                        const el = document.getElementById("nest-comparison-table");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="ml-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs border border-orange-600/30"
                    >
                      Compare Now ⚖️
                    </button>

                    <button
                      onClick={removeAllComparison}
                      className="text-xs text-orange-600 hover:text-orange-850 font-bold ml-2 transition-colors cursor-pointer"
                    >
                      Clear Nest
                    </button>
                  </div>
                </div>
              )}

              {/* Grid of Chicken Breeds */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-stone-900 flex items-center gap-2 sm:text-lg">
                    <span>📖</span> Match results ({filteredBreeds.length})
                  </h3>
                  <span className="text-xs text-stone-500 font-semibold">
                    Click a card to read full profile & care guides!
                  </span>
                </div>

                {filteredBreeds.length === 0 ? (
                  <div className="glass-card rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs border border-white/50">
                    <span className="text-5xl select-none block animate-bounce-subtle">🌾</span>
                    <h4 className="text-lg font-bold text-stone-900">No chickens match your filters</h4>
                    <p className="text-stone-500 text-xs sm:text-sm">
                      We couldn't find any breeds aligning with search term: <strong className="text-orange-655 font-bold text-orange-600">"{searchTerm || selectedVibe || selectedEggColor}"</strong>. Try clearing filters or resetting active selections.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedVibe("all");
                        setSelectedEggColor("all");
                        setSelectedSize("all");
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white border border-orange-600/30 text-xs font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBreeds.map((breed) => {
                      const isCompared = comparisonList.some(b => b.id === breed.id);
                      return (
                        <div
                          key={breed.id}
                          className="glass-card transition-all flex flex-col justify-between group cursor-pointer overflow-hidden relative border border-white/55 rounded-3xl hover:-translate-y-0.5"
                          onClick={() => setSelectedBreed(breed)}
                        >
                          {/* Card Body */}
                          <div className="p-6 space-y-4">
                            
                            {/* Card Header Tag/Vibe and Breed Type */}
                            <div className="flex items-center justify-between gap-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${breed.colorTheme.badge}`}>
                                {breed.vibeLabel}
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                                <MapPin className="w-3 h-3 text-stone-450 text-stone-400" />
                                {breed.origin}
                              </div>
                            </div>

                            {/* Breed Name & Quick Details */}
                            <div className="space-y-1">
                              <h3 className="text-2xl font-black text-gray-800 tracking-tight group-hover:text-orange-600 transition-colors font-serif italic">
                                {breed.name}
                              </h3>
                              <p className="text-stone-500 text-[11px] font-bold italic">
                                Size: <span className="font-semibold text-stone-700">{breed.size}</span> • Comb: <span className="font-semibold text-stone-700">{breed.combType}</span>
                              </p>
                            </div>

                            {/* Short Description */}
                            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                              {breed.shortDesc}
                            </p>

                            {/* Eggs and Hardiness Badges Row */}
                            <div className="pt-2 flex flex-wrap gap-1.5 border-t border-dashed border-white/40">
                              <div className="bg-white/40 border border-white/50 text-stone-700 shadow-3xs px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1">
                                <span className="text-orange-400">🥚</span>
                                <span>{getShorthandEggCategory(breed.eggColor)} egg</span>
                              </div>
                              <div className="bg-white/40 border border-white/50 text-stone-700 shadow-3xs px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1">
                                <span>🌤️</span>
                                <span>{breed.hardiness}</span>
                              </div>
                            </div>

                          </div>

                          {/* Card Footer Actions */}
                          <div 
                            className="px-6 py-3.5 bg-white/20 border-t border-white/30 flex items-center justify-between text-xs"
                            onClick={(e) => e.stopPropagation()} // Keep actions standalone
                          >
                            <button
                              onClick={() => setSelectedBreed(breed)}
                              className="text-orange-600 hover:text-orange-700 font-extrabold transition-all flex items-center gap-1 cursor-pointer"
                            >
                              Read Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </button>

                            <button
                              onClick={() => toggleComparison(breed)}
                              className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 border cursor-pointer ${
                                isCompared 
                                  ? "bg-orange-500/10 text-orange-600 border-orange-500/30"
                                  : "bg-white/40 text-stone-600 border-white/50 hover:bg-white/60"
                              }`}
                            >
                              {isCompared ? (
                                <>
                                  <Check className="w-3 h-3 text-orange-600 stroke-[3]" /> Added
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" /> Compare
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
                                   {/* Comparative Dashboard Segment */}
              {comparisonList.length > 0 && (
                <div id="nest-comparison-table" className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 pt-8 border border-white/55 shadow-lg scroll-mt-24">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/35">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-orange-605 text-orange-600 uppercase tracking-widest flex items-center gap-1 font-sans">
                        <Scale className="w-3.5 h-3.5" /> Side-by-Side Analysis
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-800 font-serif italic">
                        The Comparative Nest
                      </h3>
                      <p className="text-stone-500 text-xs font-semibold">
                        Carefully evaluate critical backyard attributes of your selected breeds.
                      </p>
                    </div>

                    <button
                      onClick={removeAllComparison}
                      className="text-xs font-bold text-orange-600 hover:bg-orange-600 hover:text-white border border-orange-200 rounded-xl px-4 py-2 flex items-center gap-1 self-start sm:self-auto cursor-pointer transition-all shadow-3xs"
                    >
                      <X className="w-3.5 h-3.5" /> Clear All Breeds
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/30 bg-white/25">
                          <th className="p-4 text-xs font-black uppercase tracking-widest text-stone-500">Attribute</th>
                          {comparisonList.map((breed) => (
                            <th key={breed.id} className="p-4 text-sm font-black text-gray-800 hover:text-orange-600 transition-all font-serif">
                              🐔 {breed.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/20 text-xs sm:text-sm">
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Vibe & Style</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 animate-fade-in">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${b.colorTheme.badge}`}>
                                {b.vibeLabel}
                              </span>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Egg Color</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 font-bold text-stone-800">
                              🥚 {b.eggColor}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Laying Quantity</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 text-stone-805 text-stone-800 font-bold">
                              ⭐⭐⭐⭐⭐ {b.eggProduction}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Physical Size</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 font-bold text-stone-800">
                              ⚖️ {b.size} {b.id === "jersey-giant" || b.id === "brahma" ? "(Up to 12-15 lbs)" : ""}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Comb Architecture</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 font-semibold text-stone-600">
                              {b.combType} type
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Foraging Mastery</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 font-bold text-stone-800">
                              {b.foraging === "Excellent" ? "🥇 Excellent" : b.foraging === "Good" ? "🥈 Good" : "🥉 " + b.foraging}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Noise Level</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 text-stone-700 font-semibold">
                              🔊 {b.noiseLevel}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Weather Adaptation</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 text-stone-750 font-semibold text-stone-700">
                              {b.hardiness === "Cold Hardy" ? "❄️ Cold Specialist" : b.hardiness === "Heat Tolerant" ? "☀️ Heat Specialist" : "🌈 All Weather Ready"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Temperaments</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4 flex flex-wrap gap-1">
                              {b.temperament.slice(0, 3).map((t, idx) => (
                                <span key={idx} className="bg-white/40 text-stone-700 font-semibold px-2 py-0.5 rounded border border-white/50 text-[10px] shadow-3xs">
                                  {t}
                                </span>
                              ))}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-extrabold text-stone-500">Action</td>
                          {comparisonList.map((b) => (
                            <td key={b.id} className="p-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setSelectedBreed(b)}
                                  className="text-[11px] bg-white/55 border border-white/60 text-orange-650 hover:bg-orange-500 hover:text-white hover:border-orange-600 font-bold px-2.5 py-1 rounded-lg cursor-pointer transition-all shadow-3xs"
                                >
                                  View profile
                                </button>
                                <button
                                  onClick={() => toggleComparison(b)}
                                  className="text-[11px] text-red-650 hover:text-red-800 font-bold px-2 cursor-pointer transition-colors"
                                  title="Remove from comparison"
                                >
                                  Remove
                                </button>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </motion.div>
          )}

          {/* BREED MATCH QUIZ TAB */}
          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden border border-white/55">
                
                {/* Visual Accent */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-orange-255/10 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>

                {!quizFinished ? (
                  <div className="space-y-6">
                    {/* Quiz Progress header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-extrabold text-orange-600 tracking-wider">
                        <span className="uppercase flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Chicken personality Matcher</span>
                        <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                      </div>
                      
                      {/* Interactive Progress bar */}
                      <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden backdrop-blur-xs border border-white/20">
                        <div 
                          className="bg-orange-500 h-full transition-all duration-350"
                          style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Question Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-stone-900 flex items-start gap-2.5 font-serif italic">
                      <span className="text-orange-500">Q{quizQuestions[currentQuestionIndex].id}.</span>
                      <span>{quizQuestions[currentQuestionIndex].question}</span>
                    </h3>

                    {/* Staggered Options list */}
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {quizQuestions[currentQuestionIndex].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleQuizChoice(quizQuestions[currentQuestionIndex].id, opt.value)}
                          className="w-full text-left p-4 rounded-2xl border border-white/55 bg-white/35 hover:bg-white/60 hover:border-orange-400 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-stone-800 group hover:scale-[1.005] active:scale-[0.99] shadow-3xs"
                        >
                          <div className="space-y-0.5">
                            <span className="font-bold block text-sm sm:text-base group-hover:text-orange-600 transition-colors">
                              {opt.text}
                            </span>
                            <span className="text-xs text-stone-500 font-medium">
                              {opt.description}
                            </span>
                          </div>
                          
                          <div className="self-end sm:self-auto flex items-center justify-center w-6 h-6 rounded-full border border-white/60 bg-white/20 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-colors">
                            <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-orange-605" />
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Back / Reset button */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/30">
                      {currentQuestionIndex > 0 ? (
                        <button
                          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                          className="text-xs font-bold text-stone-600 hover:text-stone-850 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/50 bg-white/20 hover:bg-white/45 transition-all cursor-pointer shadow-3xs"
                        >
                          Back to previous question
                        </button>
                      ) : (
                        <span className="text-xs text-stone-400 font-semibold">Select an answer to jump forward</span>
                      )}

                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to restart the quiz?")) {
                            startQuiz();
                          }
                        }}
                        className="text-xs font-bold text-stone-450 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Restart Quiz
                      </button>
                    </div>

                  </div>
                ) : (
                  // QUIZ FINISHED RESULTS
                  <div className="space-y-8 text-center sm:text-left">
                    <div className="text-center space-y-3 pb-4 border-b border-white/35">
                      <span className="text-5xl select-none block animate-wiggle">🎉🐓</span>
                      <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif italic">
                        Flock Matches Found!
                      </h3>
                      <p className="text-stone-500 text-sm max-w-lg mx-auto font-semibold">
                        Based on your outdoor acreage, climate limits, care preference, and ideal goals, here are your **top 3 matching breeds**:
                      </p>
                    </div>

                    {/* matched cards list */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {quizMatches.map((breed, bIdx) => (
                        <div
                          key={breed.id}
                          className="glass-card rounded-2xl p-5 border border-white/55 flex flex-col justify-between space-y-4 shadow-sm hover:-translate-y-0.5 transition-all relative"
                        >
                          {/* Match Rank Badge */}
                          <div className="absolute top-3 right-3 bg-orange-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-xs">
                            {bIdx + 1}
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block font-sans">
                              {breed.vibeLabel}
                            </span>
                            <h4 className="text-lg font-black text-stone-900 font-serif italic">{breed.name}</h4>
                            <p className="text-xs text-stone-500 line-clamp-4 leading-relaxed font-semibold">
                              {breed.shortDesc}
                            </p>
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() => setSelectedBreed(breed)}
                              className="w-full text-center bg-white/55 border border-white/60 text-orange-650 hover:bg-orange-500 hover:text-white transition-all text-xs font-bold py-2 rounded-xl cursor-pointer shadow-3xs"
                            >
                              Inspect Breed 📔
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl border border-white/45 text-center space-y-3 shadow-3xs">
                      <h4 className="font-extrabold text-stone-900 text-sm">
                        Ready to view these breeds alongside all other options?
                      </h4>
                      <p className="text-xs text-stone-500 max-w-md mx-auto font-semibold">
                        You can jump back into our dictionary with your filtered recommendations.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1 animate-fade-in">
                        <button
                          onClick={() => {
                            // Filter dictionary to only show recommended breeds
                            setSelectedVibe("all");
                            setSelectedEggColor("all");
                            setSelectedSize("all");
                            setSearchTerm(quizMatches.map(b => b.name).join(" "));
                            setActiveTab("dictionary");
                          }}
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all shadow-xs border border-orange-600/30 cursor-pointer"
                        >
                          Show matches in Dictionary
                        </button>
                        
                        <button
                          onClick={startQuiz}
                          className="bg-white/50 border border-white/60 text-stone-700 hover:bg-white/70 font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all text-xs"
                        >
                          Take the Quiz again ↩️
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          )}

          {/* GLOSSARY TAB */}
          {activeTab === "glossary" && (
            <motion.div
              key="glossary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Glossary Header & Search */}
              <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-lg space-y-4 border border-white/55">
                <div className="space-y-2">
                  <span className="bg-white/40 border border-white/50 text-orange-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider inline-block">
                    🐔 Chicken-Lady Jargon Decoder
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight font-serif italic">
                    Flock Glossary & Terms
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm max-w-2xl font-semibold">
                    Chickens have a unique dialect, layout, and dictionary! Understand essential words like 'Bantam', 'Crop', 'Broody', or 'Molting' so you can raise a vibrant flock.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <div className="relative w-full flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search definitions (e.g. Broody, feather, comb)..."
                      value={glossarySearch}
                      onChange={(e) => setGlossarySearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-white/60 rounded-xl text-sm bg-white/45 text-stone-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 transition-all focus:bg-white/70"
                    />
                  </div>

                  {/* Category selections */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    {["All", "Poultry Basics", "Anatomy", "Behaviors"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveGlossaryCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                          activeGlossaryCategory === cat
                            ? "bg-orange-500 text-white border-orange-600/30 shadow-xs"
                            : "bg-white/35 text-stone-600 border-white/50 hover:bg-white/60"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glossary Cards layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGlossary.map((g, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-6 rounded-3xl border border-white/55 shadow-sm hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-white/50 border border-white/60 text-stone-700 font-bold px-2 py-0.5 rounded">
                          {g.category}
                        </span>
                        <span className="text-stone-400 text-xs font-mono font-semibold">#{idx+1}</span>
                      </div>
                      
                      <h4 className="text-lg font-black text-stone-850 font-serif italic group-hover:text-orange-600 transition-colors">{g.term}</h4>
                      <p className="text-stone-650 text-xs sm:text-sm leading-relaxed font-semibold">
                        {g.definition}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/30 mt-4 text-[10px] text-stone-400 font-bold tracking-wider uppercase flex items-center gap-1">
                      <span>🐔 Term Code: {g.term.substring(0,3).toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredGlossary.length === 0 && (
                <div className="text-center p-12 text-stone-500 font-semibold bg-white/10 rounded-2xl border border-white/20">No jargon fits your search queries.</div>
              )}

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* QUICK CHICKEN PROFILE MODAL / OVERLAY */}
      <AnimatePresence>
        {selectedBreed && (
          <div className="fixed inset-0 bg-stone-900/35 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-modal max-w-2xl w-full max-h-[92vh] overflow-y-auto relative animate-fade-in"
            >
              {/* Ribbon Header decoration */}
              <div className="h-2 px-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedBreed(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/40 hover:bg-white/75 border border-white/60 flex items-center justify-center text-stone-600 hover:text-stone-850 transition-all font-bold shadow-3xs cursor-pointer"
                title="Close overlay"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Contents */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header: Name, Origin, Vibe */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-orange-500/10 text-orange-600 border border-orange-550/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      ★ {selectedBreed.vibeLabel}
                    </span>
                    <span className="bg-white/50 text-stone-700 text-[10px] border border-white/60 font-black px-2.5 py-1 rounded-full">
                      {selectedBreed.size}
                    </span>
                    <span className="text-xs text-stone-500 font-bold italic">
                      Origin: {selectedBreed.origin}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-serif italic font-black text-stone-900">
                    {selectedBreed.name}
                  </h3>
                </div>

                {/* Detailed Narrative Section */}
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-600 block">About the Breed</span>
                  <p className="text-stone-700 text-sm leading-relaxed font-semibold">
                    {selectedBreed.longDesc}
                  </p>
                </div>

                {/* Core Stats Bento Block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  <div className="bg-white/45 p-4 rounded-2xl border border-white/60 shadow-3xs space-y-1">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-wide">Egg Color</span>
                    <div className="text-xs sm:text-sm font-extrabold text-stone-850 flex items-center gap-1">
                      <span className="text-orange-400">🥚</span> {getShorthandEggCategory(selectedBreed.eggColor)}
                    </div>
                    <span className="text-[10px] text-stone-500 block truncate font-semibold">{selectedBreed.eggColor}</span>
                  </div>

                  <div className="bg-white/45 p-4 rounded-2xl border border-white/60 shadow-3xs space-y-1">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-wide">Laying Amount</span>
                    <div className="text-xs sm:text-sm font-extrabold text-stone-850 flex items-center gap-1">
                      <span className="text-orange-500">⭐</span> {selectedBreed.eggProduction.split(" ")[0]}
                    </div>
                    <span className="text-[10px] text-stone-500 block truncate font-semibold">{selectedBreed.eggSize} eggs</span>
                  </div>

                  <div className="bg-white/45 p-4 rounded-2xl border border-white/60 shadow-3xs space-y-1">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-wide">Noise Level</span>
                    <div className="text-xs sm:text-sm font-extrabold text-stone-850 flex items-center gap-1">
                      <span>🔊</span> {selectedBreed.noiseLevel.split(" ")[0]}
                    </div>
                    <span className="text-[10px] text-stone-500 block truncate font-semibold">Friendly sounds</span>
                  </div>

                  <div className="bg-white/45 p-4 rounded-2xl border border-white/60 shadow-3xs space-y-1">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-wide">Comb Style</span>
                    <div className="text-xs sm:text-sm font-extrabold text-stone-850 flex items-center gap-1">
                      <span>👑</span> {selectedBreed.combType}
                    </div>
                    <span className="text-[10px] text-stone-500 block truncate font-semibold font-mono">Heat radiation</span>
                  </div>

                </div>

                {/* Temperaments List */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-600 block">Flock Temperaments</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBreed.temperament.map((t, index) => (
                      <span
                        key={index}
                        className="bg-white/40 text-stone-800 border border-white/60 px-3 py-1 rounded-lg text-xs font-black shadow-3xs"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Weather Hardiness & Foraging Ability bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/30">
                  <div className="space-y-1.5">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-400 block">Climate Survival</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🌤️</span>
                      <div className="space-y-0.5">
                        <span className="text-xs font-black block text-stone-800">{selectedBreed.hardiness}</span>
                        <span className="text-[10px] text-stone-500 block font-semibold">Handles local seasons beautifully</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-400 block">Foraging instincts</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🐛</span>
                      <div className="space-y-0.5">
                        <span className="text-xs font-black block text-stone-800">{selectedBreed.foraging} Forager</span>
                        <span className="text-[10px] text-stone-500 block font-semibold">Natural ability to find garden grubs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fun Fact Area card */}
                <div className="bg-white/30 backdrop-blur-md p-5 rounded-2xl border-l-4 border-orange-500 border border-white/40 shadow-3xs space-y-1">
                  <h4 className="font-extrabold text-orange-600 text-xs sm:text-sm flex items-center gap-1.5">
                    📚 Did you know? (Fun Breed Fact)
                  </h4>
                  <p className="text-stone-700 text-xs leading-relaxed font-semibold">
                    {selectedBreed.funFact}
                  </p>
                </div>

                {/* Action button inside Modal */}
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      toggleComparison(selectedBreed);
                      setSelectedBreed(null);
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-black py-3.5 rounded-xl transition-all shadow-xs cursor-pointer border border-orange-500/30"
                  >
                    {comparisonList.some((b) => b.id === selectedBreed.id)
                      ? "Remove from comparison nest 🥚"
                      : "Add to comparison nest 🥚"}
                  </button>
                  <button
                    onClick={() => setSelectedBreed(null)}
                    className="px-5 bg-white/45 border border-white/50 text-stone-700 text-xs sm:text-sm font-bold rounded-xl transition-all hover:bg-white/70 cursor-pointer"
                  >
                    Done
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer bar */}
      <footer className="bg-transparent border-t border-white/40 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-semibold">
          <div className="flex items-center gap-2">
            <span>🐔</span>
            <span>
              The Chicken Dictionary © 2026. Made with ❤️ for chicken moms and dad farmers worldwide.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://chicken-dictionary.pages.dev" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 hover:underline flex items-center gap-1 transition-colors">
              Live Cloudflare Page 🌐
            </a>
            <span className="text-stone-300">•</span>
            <a href="https://github.com/iamthechickenlady-netizen/chicken-dictionary" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 hover:underline transition-colors">
              GitHub repository 💻
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
