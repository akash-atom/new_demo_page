const demo_v3 = new Swiper('.demo_v3', {
    speed: 600,
    loop: false,
    autoHeight: false,
    centeredSlides: false,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 1,
    spaceBetween: 8,
    rewind: false,
    mousewheel: {
        forceToAxis: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: 1,
        spaceBetween: 16
      },
      // tablet
      768: {
        slidesPerView: 1,
        spaceBetween: 16
      },
      // desktop
      992: {
        slidesPerView: 1,
        spaceBetween: 24
      }
    },
    navigation: {
        nextEl: '.swiper-next-demo-v3',
        prevEl: '.swiper-prev-demo-v3',
        disabledClass: "fold_1_arr_disabled"
      },
  });

  //////////////////////////////////////



  
 

  
 

    init({
      container: '#demo-form',
      adapter: 'hubspot',
      hubspot: {
        portalId: '22680279',
        formId: '8faeaa27-2d67-4cfc-936c-036cf1d5aba7',
        fieldMapping: {
          firstname: 'firstname',
          lastname: 'lastname',
          email: 'email',
          companySize: 'company_size',
          currentTool: 'current_tool'
        }
      },
      mock: false,
      onSubmit: (data) => {
        const nameParts = (data.fullName || '').trim().split(/\s+/);
        data.firstname = nameParts[0] || '';
        data.lastname = nameParts.slice(1).join(' ') || '';
      },
      onSuccess: (data) => {
        if (typeof RevenueHero !== 'undefined') {
          const hero = new RevenueHero({ routerId: '4724' });
          const nameParts = (data.fullName || '').split(' ');
          const revData = { email: data.email, firstname: nameParts[0] || '', lastname: nameParts.slice(1).join(' ') || '' }
          
          hero.submit(revData).then((sessionData) => {
            hero.dialog.open(sessionData);
          });
        }
      }
    });
  