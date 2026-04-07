import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useListings } from './hooks/useListings';
import { useMessages } from './hooks/useMessages';
import { useModals } from './hooks/useModals';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import HeroBelow from './components/HeroBelow';
import GamesSection from './components/GamesSection';
import WorkflowSection from './components/WorkflowSection';
import PlayersSection from './components/PlayersSection';
import Footer from './components/Footer';
import FilterPanel from './components/modals/FilterPanel';
import MatchModal from './components/modals/MatchModal';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import CreateListingModal from './components/modals/CreateListingModal';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import MessagesPanel from './components/MessagesPanel';

type AppView = 'home' | 'profile' | 'search';

export default function App() {
  const { user, login, logout, updateUser } = useAuth();
  const { listings, addListing, deleteListing } = useListings();
  const { sendMessage, markRead, getConversations, getThread } = useMessages(user?.id || null);
  const { showMatch, setShowMatch, showFilter, setShowFilter, showRegister, setShowRegister, showLogin, setShowLogin, showMessages, setShowMessages } = useModals();

  const [view, setView] = useState<AppView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [msgTarget, setMsgTarget] = useState<{ id: string; username: string } | null>(null);

  const goHome = () => setView('home');
  const goProfile = () => setView('profile');
  const goSearch = (q: string) => { setSearchQuery(q); setView('search'); };

  const handleMessage = (toUserId: string, toUsername: string) => {
    if (!user) { setShowLogin(true); return; }
    setMsgTarget({ id: toUserId, username: toUsername });
    setShowMessages(true);
  };

  // Count unread messages for current user
  const conversations = user ? getConversations() : [];
  const unreadCount = conversations.reduce((acc, c) => acc + c.unread, 0);

  return (
    <>
      <Navbar
        onOpenMatch={() => setShowMatch(true)}
        onOpenLogin={() => setShowLogin(true)}
        onOpenRegister={() => setShowRegister(true)}
        user={user}
        onGoProfile={goProfile}
        onOpenMessages={() => { setMsgTarget(null); setShowMessages(true); }}
        onLogout={logout}
        unreadCount={unreadCount}
        onGoSearch={goSearch}
      />

      {view === 'home' && (
        <>
          <HeroSlider onOpenMatch={() => setShowMatch(true)} />
          <HeroBelow
            onOpenMatch={() => setShowMatch(true)}
            onOpenFilter={() => setShowFilter(true)}
            onSearch={goSearch}
          />
          <GamesSection />
          <WorkflowSection />
          <PlayersSection onOpenMatch={() => setShowMatch(true)} />
          <Footer />
        </>
      )}

      {view === 'profile' && user && (
        <ProfilePage
          user={user}
          listings={listings}
          onUpdateUser={updateUser}
          onDeleteListing={deleteListing}
          onGoHome={goHome}
        />
      )}

      {view === 'search' && (
        <SearchPage
          query={searchQuery}
          listings={listings}
          user={user}
          onSearch={goSearch}
          onOpenCreateListing={() => { if (!user) { setShowLogin(true); return; } setShowCreateListing(true); }}
          onMessage={handleMessage}
          onGoHome={goHome}
          onOpenLogin={() => setShowLogin(true)}
        />
      )}

      {/* Modals */}
      {showFilter && <FilterPanel onClose={() => setShowFilter(false)} />}
      {showMatch && <MatchModal onClose={() => setShowMatch(false)} />}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
          onLogin={u => { login(u); setView('profile'); }}
        />
      )}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
          onLogin={u => { login(u); }}
        />
      )}
      {showCreateListing && user && (
        <CreateListingModal
          user={user}
          onClose={() => setShowCreateListing(false)}
          onSubmit={addListing}
        />
      )}
      {showMessages && user && (
        <MessagesPanel
          user={user}
          onClose={() => { setShowMessages(false); setMsgTarget(null); }}
          getConversations={getConversations}
          getThread={getThread}
          sendMessage={sendMessage}
          markRead={markRead}
          initialPartnerId={msgTarget?.id || null}
          initialPartnerUsername={msgTarget?.username || null}
        />
      )}
    </>
  );
}
