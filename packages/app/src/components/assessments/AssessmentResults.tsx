import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { PieChart, CheckCircle, AlertTriangle, Download, FileOutput, ArrowRight, Info, ChevronDown, ChevronUp, TrendingUp, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AssessmentResults.css';

interface SectionScore {
  title: string;
  percentage: number;
  completed: boolean;
}

interface ResultData {
  overallScore: number;
  sectionScores: SectionScore[];
  assessmentType: 'ransomware' | 'supplychain' | 'cui' | 'privacy';
  frameworkName: string;
  completedDate: string;
  assessmentId?: string;
}

interface AssessmentResultsProps {
  data: ResultData;
  onExport: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ data, onExport }) => {
  // Refs for progress bars
  const overallProgressRef = useRef<HTMLDivElement>(null);
  const sectionProgressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // Set CSS custom properties for overall progress bar
  useEffect(() => {
    if (overallProgressRef.current) {
      overallProgressRef.current.style.setProperty('--progress-width', `${data.overallScore}%`);
    }
  }, [data.overallScore]);

  // Set CSS custom properties for section progress bars
  useEffect(() => {
    sectionProgressRefs.current.forEach((ref, index) => {
      if (ref && data.sectionScores[index]) {
        ref.style.setProperty('--progress-width', `${data.sectionScores[index].percentage}%`);
      }
    });
  }, [data.sectionScores]);

  // Calculate key metrics
  const completedSections = data.sectionScores.filter(s => s.completed).length;
  const avgSectionScore = Math.round(
    data.sectionScores.reduce((sum, s) => sum + s.percentage, 0) / data.sectionScores.length
  );
  const criticalSections = data.sectionScores.filter(s => s.percentage < 50);
  const strongSections = data.sectionScores.filter(s => s.percentage >= 80);
  
  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Helper functions
  const getRecommendationsLink = (assessmentType: string, assessmentId?: string) => {
    const id = assessmentId || 'demo';
    // Map assessment types to their correct route paths
    const typeMap: Record<string, string> = {
      'supplychain': 'supply-chain',
      'ransomware': 'supply-chain', // Currently only supply-chain recommendations exist
      'cui': 'supply-chain',
      'privacy': 'supply-chain'
    };
    const routeType = typeMap[assessmentType] || 'supply-chain';
    return `/${routeType}-recommendations/${id}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-success/10 dark:bg-success/20';
    if (score >= 60) return 'bg-primary/10 dark:bg-primary/20';
    if (score >= 40) return 'bg-warning/10 dark:bg-warning/20';
    return 'bg-destructive/10 dark:bg-destructive/20';
  };

  const getSeverityText = (score: number) => {
    if (score >= 80) return 'Low Risk';
    if (score >= 60) return 'Moderate Risk';
    if (score >= 40) return 'High Risk';
    return 'Critical Risk';
  };

  const frameworkLogos = {
    'ransomware': <PieChart className="h-12 w-12 text-destructive" />,
    'supplychain': <CheckCircle className="h-12 w-12 text-primary" />,
    'cui': <FileOutput className="h-12 w-12 text-secondary" />,
    'privacy': <Info className="h-12 w-12 text-accent" />
  };

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <Card className="border dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0">{frameworkLogos[data.assessmentType]}</div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">Assessment Results</CardTitle>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">{data.frameworkName} • {data.completedDate}</p>
              </div>
            </div>
            <Button onClick={onExport} size="sm" className="flex-shrink-0">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Overall Score - Compact */}
            <div className="lg:col-span-1 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-3">
                <div className="relative inline-block">
                  <div className={`text-4xl sm:text-5xl font-bold ${getScoreColor(data.overallScore)} leading-none`}>{data.overallScore}%</div>
                  <div className={`text-xs font-medium mt-1 ${getScoreColor(data.overallScore)}`}>{getSeverityText(data.overallScore)}</div>
                  <svg className="absolute -top-2 -left-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" className="fill-none stroke-gray-200 dark:stroke-gray-700 stroke-[4%]" />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      className={`fill-none ${getScoreColor(data.overallScore)} stroke-[4%] transition-all duration-500`}
                      strokeDasharray={`${data.overallScore} 100`}
                    />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 dark:text-gray-300">Compliance Score</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    ref={overallProgressRef}
                    className={`assessment-progress-bar assessment-progress-bar-overall ${getScoreBackground(data.overallScore)}`}>
                  </div>
                </div>
              </div>

              {data.overallScore < 70 && (
                <div className="mb-3 p-2 bg-warning/10 dark:bg-warning/20 rounded text-xs flex items-start gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-warning flex-shrink-0 mt-0.5" />
                  <span><span className="font-medium">Action required.</span> Address identified gaps.</span>
                </div>
              )}

              <Link to={getRecommendationsLink(data.assessmentType, data.assessmentId)}>
                <Button className="w-full text-xs" size="sm">
                  View Recommendations
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            {/* Key Metrics - Compact */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{completedSections}/{data.sectionScores.length}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">sections</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Avg Score</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{avgSectionScore}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">across sections</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Critical</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{criticalSections.length}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">need attention</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-success" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Strong</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{strongSections.length}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">excellent areas</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Scores - Collapsible */}
      <Card className="border dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Section Breakdown</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs"
            >
              {showDetails ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show Details
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className={`space-y-3 assessment-scrollbar ${showDetails ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`}>
            {data.sectionScores
              .map((section, originalIndex) => ({ section, originalIndex }))
              .sort((a, b) => a.section.percentage - b.section.percentage) // Sort by score (lowest first)
              .map(({ section, originalIndex }) => {
                const isExpanded = expandedSections.has(originalIndex);
                const isCritical = section.percentage < 50;
                const isStrong = section.percentage >= 80;
                
                return (
                  <div 
                    key={originalIndex} 
                    className={`group border rounded-lg p-3 transition-all ${
                      isCritical ? 'border-warning/50 bg-warning/5 dark:bg-warning/10' :
                      isStrong ? 'border-success/50 bg-success/5 dark:bg-success/10' :
                      'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {isCritical && <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />}
                        {isStrong && <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />}
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{section.title}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`text-sm font-semibold ${getScoreColor(section.percentage)} flex-shrink-0`}>
                          {section.percentage}%
                        </div>
                        {showDetails && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSection(originalIndex)}
                            className="h-6 w-6 p-0"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                      <div 
                        ref={(el) => {
                          sectionProgressRefs.current[originalIndex] = el;
                        }}
                        className={`assessment-progress-bar assessment-progress-bar-section ${getScoreBackground(section.percentage)}`}>
                      </div>
                    </div>
                    {showDetails && isExpanded && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
                        {section.completed ? (
                          <span className="text-success">✓ Assessment completed for this section</span>
                        ) : (
                          <span className="text-warning">⚠ Incomplete - review required</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Compact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10 dark:bg-success/20">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Strengths</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{strongSections.length} strong areas</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10 dark:bg-warning/20">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Improvements</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{criticalSections.length} critical gaps</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                <FileOutput className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Documentation</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Evidence & reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentResults;

export { AssessmentResults }