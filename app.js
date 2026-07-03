// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initRecipientName();
  initAudioSystem();
  initScrollAnimations();
  initScrollingMemories();
});

function initRecipientName() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name') || 'Subi...';
  const nameEl = document.getElementById('recipientName');
  if(nameEl) nameEl.textContent = name;
}

let mainAudio = null;
let specialAudio = null;

function initAudioSystem() {
  window.mainAudio = new Audio('./Songs/1.m4a');
  window.mainAudio.loop = true;
  window.mainAudio.volume = 0.5;
  
  const attemptPlay = () => {
    if (window.mainAudio.paused) {
      window.mainAudio.play().then(() => {
        // Success! Remove all interaction listeners
        window.removeEventListener('click', attemptPlay);
        window.removeEventListener('touchstart', attemptPlay);
        window.removeEventListener('scroll', attemptPlay);
        window.removeEventListener('mousemove', attemptPlay);
        window.removeEventListener('keydown', attemptPlay);
      }).catch((err) => {
        // Autoplay still blocked, we will try again on next event
      });
    }
  };

  // Try playing immediately
  attemptPlay();

  // Attach aggressive fallback listeners
  window.addEventListener('click', attemptPlay);
  window.addEventListener('touchstart', attemptPlay);
  window.addEventListener('scroll', attemptPlay, { passive: true });
  window.addEventListener('mousemove', attemptPlay);
  window.addEventListener('keydown', attemptPlay);
}

function initScrollAnimations() {
  gsap.utils.toArray('.anim-reveal').forEach(element => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%'
        }
      }
    );
  });
}

// Ensure initFireworks and initConfetti don't crash if called
function initFireworks() {}
function initConfetti() {}

function initScrollingMemories() {
  const feed = document.getElementById('memoryFeed');
  if (!feed) return;

  const quotes = [
    "Some people enter our lives with grand introductions, while others quietly become part of our everyday story. You were never just another person I met—you became one of those rare souls whose presence makes ordinary moments feel special. Thank you for being a reminder that the greatest friendships are often the simplest ones.",
    "Life is a book filled with countless pages, but only a few chapters remain unforgettable. Our friendship is one of those chapters that I hope time never closes. No matter where life leads us, the memories we've created will always have a place in my heart.",
    "A true friend doesn't always solve your problems or have all the answers. Sometimes, they simply stay beside you until you find your own strength again. That's the beauty of genuine friendship—it speaks the loudest in moments of silence.",
    "Not every friendship needs constant conversations to stay alive. Some bonds grow stronger through understanding, trust, and the comfort of knowing someone is always wishing the best for you, even from afar. That's the kind of friendship worth holding onto forever.",
    "There are people who brighten a room simply by walking into it, not because they seek attention, but because kindness naturally follows them. Thank you for being that light. Never let the world convince you to shine any less than you already do.",
    "Friendship isn't about staying the same forever. It's about growing into different versions of ourselves while still finding reasons to smile together. As life changes around us, I hope our respect, memories, and gratitude for each other never change.",
    "One of the greatest gifts a friend can give is the freedom to be completely yourself. No pretending. No masks. No fear of being judged. Thank you for creating a friendship where honesty feels comfortable and kindness feels effortless.",
    "Years from now, we may not remember every conversation we had, but we'll remember how those moments made us feel. We'll remember the laughter, the support, the unexpected adventures, and the comfort of knowing someone genuinely cared. Those memories will always be enough.",
    "The world introduces us to thousands of people, yet only a handful leave a lasting mark on our hearts. True friendship isn't found every day—it's discovered in people whose kindness, sincerity, and compassion quietly become unforgettable. Thank you for being one of those rare souls.",
    "No one knows where life will take us. Our paths may change, our dreams may grow, and our destinations may become different. But I hope whenever you look back, you'll remember that somewhere along your journey, there was a friend who genuinely wished nothing but happiness and success for you.",
    "Distance has never been powerful enough to erase a real friendship. Whether we're sitting side by side or living miles apart, genuine connections don't fade with time. They live quietly in memories, respect, and the hope that life treats the other person kindly.",
    "Friendship isn't built through extraordinary events alone. It's built through random conversations, shared laughter, silly jokes, thoughtful gestures, and moments that seem ordinary until one day they become the memories we cherish the most.",
    "Some people make us feel heard without asking questions. They make us feel understood without needing explanations. They become a safe place in a world that's constantly changing. Every friendship that offers such peace is truly priceless.",
    "Never change your kindness to fit a world that sometimes forgets its value. Continue being the person who listens, encourages, and spreads warmth wherever you go. The world needs more hearts like yours, even if it doesn't always say it out loud.",
    "Friendship isn't a promise written on paper. It's a promise kept through actions, respect, trust, and genuine care. It's knowing that no matter how busy life becomes, there will always be gratitude for the memories we've shared.",
    "Your smile has probably brought comfort to more people than you'll ever realize. Never underestimate the impact of your kindness, your words, or your presence. Sometimes, the smallest acts leave the biggest impressions on someone's heart.",
    "The best people aren't the richest, the smartest, or the most successful. They're the ones who make others feel seen, appreciated, and valued. If you continue being that person, life will always have a beautiful way of giving your kindness back.",
    "The greatest friendships don't hold us back—they quietly inspire us to become better versions of ourselves. Thank you for reminding me that genuine people still exist and that kindness is still one of the most powerful things anyone can offer.",
    "One day, we'll each be busy chasing our own dreams, building our own futures, and writing different stories. But I hope those stories always include a page that says, 'I was fortunate enough to have a friend who made part of my journey beautiful.'",
    "Friendship isn't about knowing how long someone will stay in your life. It's about appreciating every moment while they're there. Thank you for every laugh, every lesson, every memory, and every reminder that some of life's greatest blessings arrive in the form of a true friend.",
    "Life has a strange way of bringing the right people into our lives when we least expect it. We don't choose every friendship, yet somehow the best ones become the ones we could never imagine living without. Thank you for being one of life's unexpected blessings.",
    "Years may erase faces, places, and countless memories, but they never erase the kindness someone made us feel. Your kindness is one of those things that time will never be able to take away.",
    "Not every relationship needs a label to explain its importance. Some people simply become part of your happiness, your memories, and your strength. That's what true friendship feels like.",
    "Sometimes life sends friends on different roads. Different cities. Different dreams. Different responsibilities. But real friendship isn't measured by how often people meet—it's measured by how sincerely they wish the best for each other.",
    "You'll probably never know how many lives you've touched simply by being yourself. A kind word, a small smile, or a moment of encouragement can stay with someone for years. Never underestimate the quiet influence you have.",
    "In a world where people often change to fit expectations, never lose the courage to remain yourself. The people who truly matter will always appreciate the real version of you.",
    "The greatest luxury isn't wealth, success, or fame. It's having someone who genuinely celebrates your happiness, believes in your dreams, and stays proud of you without expecting anything in return.",
    "Some friendships feel connected by invisible threads. Even after months of silence, they continue exactly where they left off—as though time never passed at all. Those are the friendships worth protecting.",
    "True friends don't admire perfection. They admire honesty, resilience, kindness, and the courage to keep moving forward despite life's imperfections.",
    "The weather changes. The years change. Even people change. But the memories created through genuine friendship continue blooming long after the seasons have passed.",
    "Whenever life makes you question your worth, remember this: someone is grateful that you exist. Someone smiles because of your kindness. Someone's life became brighter simply because you were part of it.",
    "Meeting someone may be a coincidence. Becoming friends may be a choice. But finding a friendship that continues to inspire, comfort, and uplift you is one of life's rarest gifts.",
    "Everyone carries battles they never speak about. That's why kindness matters. Sometimes the smallest act of understanding becomes the greatest source of strength for someone else.",
    "Not every blessing arrives wrapped in success or fortune. Some arrive quietly as people who teach us to laugh more, worry less, and appreciate life a little deeper. Those blessings are called friends.",
    "As we grow older, we realize that life isn't about collecting things—it's about collecting moments and people who make those moments unforgettable. Thank you for being part of that collection.",
    "Strong people aren't the ones who never struggle. They're the ones who continue smiling while carrying responsibilities no one else can see. May you always find reasons to keep smiling.",
    "Some people leave footprints wherever they go. Others leave peace. Long after they leave, their kindness continues to live in conversations, memories, and grateful hearts. That's the kind of impact you have.",
    "The best friendships don't compete with each other. They quietly inspire each other to dream bigger, become kinder, and grow into better human beings every single day.",
    "One day we'll look back and realize that the most meaningful moments weren't the extraordinary ones—they were the ordinary afternoons, random conversations, shared laughter, and simple memories we almost overlooked.",
    "There may never be enough words to express how much a genuine friendship means. So instead of trying to explain it, I'll simply say this: thank you for existing, for being yourself, and for making this journey called life a little brighter for everyone fortunate enough to know you.",
    "Some places exist on maps, while others exist in our hearts. Friendship is one of those places—a place where we find comfort, understanding, and the courage to keep moving forward.",
    "Not every meaningful person enters our life with a purpose we can understand. Sometimes, the most beautiful friendships begin as ordinary encounters and slowly become extraordinary memories.",
    "If time could speak, it wouldn't count the days we spent together. It would remember the laughter, the silent support, the little conversations, and the moments that made life feel lighter.",
    "The greatest gift you can offer someone isn't expensive or rare—it's your genuine presence. Being there when it matters is what turns ordinary people into unforgettable friends.",
    "Friendship is like a quiet garden. It doesn't bloom because of grand gestures but because of patience, honesty, respect, and countless little moments of care.",
    "The world often celebrates loud victories, but the strongest hearts are usually the gentlest ones. They choose kindness when it's easier to be harsh, and they choose understanding when it's easier to judge.",
    "Some memories fade like old photographs. But the people who taught us kindness, confidence, and hope remain vivid forever. That's the magic of true friendship.",
    "The sun never competes with the moon, yet both make the sky beautiful in their own time. Likewise, true friends never compete—they simply help each other shine.",
    "Some leave lessons. Some leave pain. Some leave inspiration. The rarest people leave peace. May your friendship always be remembered for the peace it brought into someone's life.",
    "The deepest conversations are not always spoken aloud. Sometimes friendship is simply knowing someone understands your silence without asking a single question.",
    "People often remember those who spoke the loudest. But they never forget the one who listened with genuine care. Listening is one of the purest forms of friendship.",
    "The greatest treasures in life cannot be bought or earned—they quietly appear as people who believe in you when you struggle to believe in yourself.",
    "Years from now, no one will remember every achievement. But they will remember how you treated people, how you made them feel, and the kindness you shared without expecting anything in return.",
    "Friendship is a bridge that allows two lives to remain connected, even when distance, time, and responsibilities try to pull them apart.",
    "Anyone can stand beside you when the sun is shining. A true friend quietly opens an umbrella without asking why it's raining.",
    "Some friendships deserve more than words. They deserve lifelong gratitude for the strength, laughter, and hope they brought into our lives when we needed them most.",
    "Our lives aren't remembered because of a few extraordinary days. They're remembered because of thousands of ordinary moments shared with extraordinary people.",
    "If one day people remember you, let it be because you made others feel valued, respected, and understood. That is one of the most beautiful legacies anyone can leave behind.",
    "We often admire the brightest stars while forgetting the countless others that quietly light up the night. Friendship is like that—the quiet people often make the biggest difference in our lives.",
    "No matter where life takes us, I hope you always carry one thought with you: somewhere in this world, there's a friend who is genuinely grateful that our paths crossed. Some friendships don't need daily conversations to stay alive—they simply live forever in respect, memories, and silent prayers for each other's happiness.",
    "Life isn't remembered by the places we visit or the things we own. It's remembered by the people we carry in our hearts. Thank you for becoming one of those rare souls whose kindness turns ordinary memories into lifelong treasures.",
    "The horizon is never within our reach, yet it reminds us to keep moving forward. A true friend is much the same—always encouraging, always believing, always reminding us that tomorrow holds new possibilities, even when today feels uncertain.",
    "Friendship speaks a language that needs no translation. It's found in the comfort of shared silence, the warmth of genuine laughter, the strength of quiet support, and the simple feeling of knowing someone is sincerely wishing the best for you.",
    "Among the billions of lives in this world, it's extraordinary that our paths crossed. Perhaps some meetings are not accidents but gentle reminders that life knows exactly when we need someone who will make our journey a little lighter and our memories a little brighter.",
    "As the years pass, may you never lose the kindness that makes people feel welcome, the courage that helps you face every challenge, or the smile that quietly brightens someone's day. The world doesn't need another version of someone else—it simply needs more of the wonderful person you already are."
  ];

  const mediaFiles = [
    { type: 'image', src: './images/1.jpeg' },
    { type: 'image', src: './images/2.jpeg' },
    { type: 'image', src: './images/3.jpeg' },
    { type: 'image', src: './images/4.jpeg' },
    { type: 'image', src: './images/5.jpeg' },
    { type: 'image', src: './images/6.jpeg' },
    { type: 'image', src: './images/7.jpg' },
    { type: 'image', src: './images/8.jpg' },
    { type: 'image', src: './images/9.jpeg' },
    { type: 'image', src: './images/10.jpg' },
    { type: 'image', src: './images/11.jpg' },
    { type: 'image', src: './images/12.jpeg' },
    { type: 'image', src: './images/13.jpeg' },
    { type: 'image', src: './images/14.jpeg' },
    { type: 'image', src: './images/15.jpeg' },
    { type: 'image', src: './images/16.jpeg' },
    { type: 'image', src: './images/17.jpeg' },
    { type: 'image', src: './images/18.jpeg' },
    { type: 'image', src: './images/19.jpg' },
    { type: 'image', src: './images/20.jpeg' },
    { type: 'image', src: './images/21.jpeg' },
    { type: 'image', src: './images/22.jpeg' },
    { type: 'image', src: './images/23.jpeg' },
    { type: 'image', src: './images/24.jpg' },
    { type: 'image', src: './images/25.jpeg' },
    { type: 'image', src: './images/26.jpeg' },
    { type: 'image', src: './images/aa (1).jpg' },
    { type: 'image', src: './images/aa (10).jpeg' },
    { type: 'image', src: './images/aa (10).jpg' },
    { type: 'image', src: './images/aa (11).jpeg' },
    { type: 'image', src: './images/aa (11).jpg' },
    { type: 'image', src: './images/aa (12).jpeg' },
    { type: 'image', src: './images/aa (12).jpg' },
    { type: 'image', src: './images/aa (13).jpeg' },
    { type: 'image', src: './images/aa (14).jpeg' },
    { type: 'image', src: './images/aa (15).jpeg' },
    { type: 'image', src: './images/aa (16).jpeg' },
    { type: 'image', src: './images/aa (17).jpeg' },
    { type: 'image', src: './images/aa (17).jpg' },
    { type: 'image', src: './images/aa (19).jpeg' },
    { type: 'image', src: './images/aa (2).jpeg' },
    { type: 'image', src: './images/aa (21).jpeg' },
    { type: 'image', src: './images/aa (23).jpeg' },
    { type: 'image', src: './images/aa (24).jpeg' },
    { type: 'image', src: './images/aa (28).jpeg' },
    { type: 'image', src: './images/aa (29).jpeg' },
    { type: 'image', src: './images/aa (31).jpeg' },
    { type: 'image', src: './images/aa (32).jpeg' },
    { type: 'image', src: './images/aa (4).jpeg' },
    { type: 'image', src: './images/aa (4).jpg' },
    { type: 'image', src: './images/aa (5).jpeg' },
    { type: 'image', src: './images/aa (5).jpg' },
    { type: 'image', src: './images/aa (6).jpeg' },
    { type: 'image', src: './images/aa (6).jpg' },
    { type: 'image', src: './images/aa (7).jpg' },
    { type: 'image', src: './images/aa (8).jpeg' },
    { type: 'image', src: './images/aa (8).jpg' },
    { type: 'image', src: './images/aa (9).jpeg' },
    { type: 'image', src: './images/aa (9).jpg' },
    { type: 'video', src: './videos/2 (1).mp4' },
    { type: 'video', src: './videos/2 (2).mp4' },
    { type: 'video', src: './videos/2 (4).mp4' },
    { type: 'image', src: './images/aa100.jpeg' }
  ];

  window.GLOBAL_MEDIA_FILES = mediaFiles;

  mediaFiles.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'memory-feed-card anim-reveal-scroll';
    
    if(item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.src;
      img.className = 'memory-feed-media';
      img.loading = 'lazy';
      img.onerror = function() {
        if (this.src.endsWith('.jpeg')) {
          this.src = this.src.replace('.jpeg', '.jpg');
        } else if (this.src.endsWith('.jpg')) {
          this.src = this.src.replace('.jpg', '.jpeg');
        }
      };
      card.appendChild(img);
    } else if(item.type === 'video') {
      const vid = document.createElement('video');
      vid.src = item.src;
      vid.className = 'memory-feed-media';
      vid.controls = true;
      vid.muted = true;
      vid.preload = 'metadata';
      card.appendChild(vid);
    }
    
    if(quotes[index]) {
      const quoteDiv = document.createElement('div');
      quoteDiv.className = 'image-quote';
      quoteDiv.textContent = quotes[index];
      card.appendChild(quoteDiv);
    }

    feed.appendChild(card);
  });

  setTimeout(() => {
    const cards = gsap.utils.toArray('.anim-reveal-scroll');
    cards.forEach((element, index) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Play special song when reaching the last image
      if (index === cards.length - 1) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 85%', // when the image enters the viewport
          onEnter: () => {
            // Fade out and stop the first song using GSAP
            if (window.mainAudio) {
              gsap.to(window.mainAudio, {
                volume: 0,
                duration: 1,
                onComplete: () => window.mainAudio.pause()
              });
            }
            
            // Initialize special audio if it doesn't exist
            if (!window.specialAudio) {
              window.specialAudio = new Audio('./Songs/2.m4a');
              window.specialAudio.loop = false; // Only play once per trigger
              
              // When special song finishes, return to main song 1
              window.specialAudio.addEventListener('ended', () => {
                if (window.mainAudio) {
                  window.mainAudio.play().catch(e => console.log(e));
                  gsap.to(window.mainAudio, {
                    volume: 0.5,
                    duration: 1
                  });
                }
              });
            }
            
            // Only restart if it's paused or ended
            if (window.specialAudio.paused) {
              window.specialAudio.currentTime = 0;
              window.specialAudio.volume = 0; // Start at 0 for fade in
              window.specialAudio.play().catch(e => console.log("Final audio play blocked:", e));
              
              // Fade in the new song
              gsap.to(window.specialAudio, {
                volume: 0.8,
                duration: 1
              });
            }
          }
        });
      }
    });
  }, 100);
}



