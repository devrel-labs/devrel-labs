'use client';

import { useState, useEffect } from 'react';
import { Github, Twitter, Mail, Users, GitFork, Star, ExternalLink, Menu, X, Code, Zap, Globe } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

interface Member {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface OrgStats {
  public_repos: number;
  followers: number;
  following: number;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [orgStats, setOrgStats] = useState<OrgStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalStars, setTotalStars] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const fetchGitHubData = async () => {
  //     try {
  //       setLoading(true);
        
  //       // Fetch organization data
  //       const orgResponse = await fetch('https://api.github.com/orgs/devrel-labs');
  //       const orgData = await orgResponse.json();
  //       setOrgStats(orgData);

  //       // Fetch repositories
  //       const reposResponse = await fetch('https://api.github.com/orgs/devrel-labs/repos?sort=updated&per_page=6');
  //       const reposData = await reposResponse.json();
  //       setRepositories(reposData);

  //       // Calculate total stars
  //       const stars = reposData.reduce((total: number, repo: Repository) => total + repo.stargazers_count, 0);
  //       setTotalStars(stars);

  //       // Fetch members
  //       const membersResponse = await fetch('https://api.github.com/orgs/devrel-labs/members?per_page=8');
  //       const membersData = await membersResponse.json() ?? [];
  //       setMembers(membersData);

  //     } catch (error) {
  //       console.error('Error fetching GitHub data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchGitHubData();
  // }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'Python': '#3572A5',
      'Java': '#b07219',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'C++': '#f34b7d',
      'HTML': '#e34c26',
      'CSS': '#1572B6',
      'Shell': '#89e051',
      'Dockerfile': '#384d54'
    };
    return colors[language || ''] || '#6b7280';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mono tracking-wider">
                &gt; devrel-labs_
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#about" className="hover:text-cyan-400 transition-colors duration-300 font-mono text-sm">[about]</a>
                <a href="#repositories" className="hover:text-cyan-400 transition-colors duration-300 font-mono text-sm">[repos]</a>
                <a href="#team" className="hover:text-cyan-400 transition-colors duration-300 font-mono text-sm">[team]</a>
                <a href="#community" className="hover:text-cyan-400 transition-colors duration-300 font-mono text-sm">[community]</a>
                <a 
                  href="https://github.com/organizations/devrel-labs" 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 rounded-md hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-mono text-sm"
                  aria-label="Visit DevRel Labs on GitHub"
                >
                  ./github
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#about" className="block px-3 py-2 rounded-md hover:bg-gray-800 transition-colors font-mono text-sm">[about]</a>
              <a href="#repositories" className="block px-3 py-2 rounded-md hover:bg-gray-800 transition-colors font-mono text-sm">[repos]</a>
              <a href="#team" className="block px-3 py-2 rounded-md hover:bg-gray-800 transition-colors font-mono text-sm">[team]</a>
              <a href="#community" className="block px-3 py-2 rounded-md hover:bg-gray-800 transition-colors font-mono text-sm">[community]</a>
              <a href="https://github.com/organizations/devrel-labs" className="block px-3 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 mt-2 font-mono text-sm">./github</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`,
            }}
          />
        </div>

        {/* Floating Elements */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-40 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="font-mono text-cyan-400 text-lg mb-4 opacity-80">
              $ initializing devrel-labs...
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 font-mono tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                devrel-labs
              </span>
              <span className="text-cyan-400 animate-pulse">_</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 animate-fade-in-up font-mono" style={{ animationDelay: '0.3s' }}>
              &gt; building.future.of.open_source()
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in-up font-mono leading-relaxed" style={{ animationDelay: '0.6s' }}>
              // A collaborative GitHub organization by nihitdotdev team<br/>
              // Dedicated to innovative tools & developer communities<br/>
              // Advancing open source for next-gen developers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <a 
                href="#repositories" 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-md text-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-mono"
              >
                ./explore_repos
              </a>
              <a 
                href="https://github.com/organizations/devrel-labs" 
                className="border border-cyan-500 px-8 py-4 rounded-md text-lg font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-mono"
                aria-label="View DevRel Labs on GitHub"
              >
                <Github size={24} />
                view.on.github()
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono">
              &gt; about.devrel_labs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
              // Mission: democratize developer tools & create inclusive OSS ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-mono text-cyan-400">community.first()</h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                // Building tools that serve developers<br/>
                // Feedback & collaboration at core<br/>
                // Community-driven development
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <GitFork size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-mono text-purple-400">open.source()</h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                // Every project is open source<br/>
                // Transparency & collaboration<br/>
                // Shared knowledge ecosystem
              </p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-mono text-pink-400">innovation.push()</h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                // Cutting-edge technologies<br/>
                // Creative solutions for devs<br/>
                // Modern development challenges
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Repositories Section */}
      <section id="repositories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent font-mono">
              &gt; featured.repositories[]
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
              // Latest open source repos shaping dev future
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-700 rounded w-20"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-12"></div>
                    <div className="h-4 bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repositories.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group block"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors font-mono">
                      {repo.name}
                    </h3>
                    <ExternalLink size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  
                  <p className="text-gray-400 mb-4 font-mono text-sm leading-relaxed">
                    {repo.description || '// No description available'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.language && (
                      <span 
                        className="px-2 py-1 text-xs rounded border font-mono"
                        style={{ 
                          backgroundColor: `${getLanguageColor(repo.language)}20`,
                          borderColor: `${getLanguageColor(repo.language)}50`,
                          color: getLanguageColor(repo.language)
                        }}
                      >
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 2).map((topic) => (
                      <span 
                        key={topic}
                        className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm text-gray-400 font-mono">
                    <div className="flex items-center gap-1">
                      <Star size={16} />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={16} />
                      {repo.forks_count}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 font-mono">
                    // Updated: {formatDate(repo.updated_at)}
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a 
              href="https://github.com/orgs/devrel-labs/repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 font-mono"
            >
              <Github size={24} />
              view.all.repos()
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent font-mono">
              &gt; team.members[]
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
              // Passionate developers building amazing OSS
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="text-center group animate-pulse">
                  <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-700 rounded mb-2 w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member) => (
                <a
                  key={member.id}
                  href={member.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center group block"
                >
                  <div className="relative mb-6">
                    <img 
                      src={member.avatar_url}
                      alt={`${member.login} avatar`}
                      className="w-32 h-32 rounded-full mx-auto border-4 border-gray-700 group-hover:border-pink-500 transition-all duration-300 transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-400 transition-colors font-mono">
                    @{member.login}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm">
                    // {member.type === 'User' ? 'Developer' : member.type}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-mono">
            &gt; join.community()
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-mono">
            // Connect with devs, contribute to OSS, shape dev tools future
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <div className="text-3xl font-bold text-cyan-400 mb-2 font-mono">
                {loading ? '...' : "members.length"}+
              </div>
              <div className="text-gray-400 font-mono text-sm">// Community Members</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <div className="text-3xl font-bold text-purple-400 mb-2 font-mono">
                {loading ? '...' : "orgStats?.public_repos"}+
              </div>
              <div className="text-gray-400 font-mono text-sm">// Open Source Repositories</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <div className="text-3xl font-bold text-pink-400 mb-2 font-mono">
                {loading ? '...' : "totalStars"}+
              </div>
              <div className="text-gray-400 font-mono text-sm">// GitHub Stars</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/organizations/devrel-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-mono"
            >
              <Github size={24} />
              join.on.github()
            </a>
            <a 
              href="mailto:hello@devrel-labs.dev"
              className="inline-flex items-center gap-2 border border-cyan-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105 font-mono"
            >
              <Mail size={24} />
              get.in.touch()
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 md:mb-0 font-mono">
              &gt; devrel-labs_
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="https://github.com/organizations/devrel-labs" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://twitter.com/devrel-labs" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="mailto:hello@devrel-labs.dev" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800/50 text-center text-gray-400">
            <p className="font-mono text-sm">
              // &copy; 2025 DevRel Labs. Built with ❤️ by nihitdotdev team
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}