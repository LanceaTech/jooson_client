'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, CheckCircle, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useForm, ValidationError } from '@formspree/react';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});


type LanguageKey = 'en' | 'zh';

interface ContentStructure {
    slides: Array<{
        title: string;
        subtitle: string;
        description: string;
        image: string;
    }>;
    nav: {
        home: string;
        about: string;
        services: string;
        contact: string;
    };
    hero: {
        cta: string;
    };
    about: {
        title: string;
        description1: string;
        description2: string;
        image: string;
        stats: {
            experience: string;
            projects: string;
            satisfaction: string;
        };
    };
    services: {
        title: string;
        subtitle: string;
        cta: string;
        categories: {
            roofing: {
                title: string;
                sections: Array<{
                    title: string;
                    description: string;
                    image: string;
                    points: string[];
                }>;
            };
            walls: {
                title: string;
                sections: Array<{
                    title: string;
                    description: string;
                    image: string;
                    points: string[];
                }>;
            };
            restoration: {
                title: string;
                sections: Array<{
                    title: string;
                    description: string;
                    image: string;
                    points: string[];
                }>;
            };
        };
    };
    testimonials: {
        title: string;
        subtitle: string;
        items: Array<{
            name: string;
            role: string;
            content: string;
            rating: number;
        }>;
    };
    contact: {
        title: string;
        subtitle: string;
        form: {
            name: string;
            namePlaceholder: string;
            email: string;
            emailPlaceholder: string;
            phone: string;
            phonePlaceholder: string;
            service: string;
            servicePlaceholder: string;
            serviceOptions: Array<{
                value: string;
                label: string;
            }>;
            message: string;
            messagePlaceholder: string;
            submit: string;
        };
        info: {
            emergency: string;
            phone: string;
            emailLabel: string;
            email: string;
            location: string;
            area: string;
        };
    };
    footer: {
        companyName: string;
        description: string;
        quickLinks: {
            title: string;
            home: string;
            about: string;
            services: string;
            industries: string;
            projects: string;
            testimonials: string;
            certifications: string;
            careers: string;
            news: string;
            contact: string;
        };
        servicesSection: {
            title: string;
            waterproofing: string;
            wallCoating: string;
            repainting: string;
            rustproofing: string;
            metalWorks: string;
            puGrouting: string;
            floorCoating: string;
            windowSealant: string;
        };
        address: {
            title: string;
            street: string;
        };
        contactUs: {
            title: string;
            phone: string;
            phoneNumber: string;
            email: string;
            emailAddress: string;
        };
        copyright: string;
    };
}

export default function LandingPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [testimonialSlide, setTestimonialSlide] = useState(0);
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
    const [activeServiceTab, setActiveServiceTab] = useState<ServiceCategoryKey>('roofing');
    const [language, setLanguage] = useState<LanguageKey>('en');
    const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const [state, handleSubmit] = useForm("mblovkgv");

    // Define a type for your service categories keys
    type ServiceCategoryKey = 'roofing' | 'walls' | 'restoration';

    const log = (message: string, level: 'info' | 'warn' | 'error' = 'info') => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

        if (typeof window !== 'undefined') {
            if (level === 'error') {
                console.error(logMessage);
            } else if (level === 'warn') {
                console.warn(logMessage);
            } else {
                console.log(logMessage);
            }
        }
    };

    const content: Record<LanguageKey, ContentStructure> = {
        en: {
            slides: [
                {
                    title: "Joo Soon Metal Works",
                    subtitle: "Professional Waterproofing Solutions",
                    description: "Comprehensive waterproofing protection for all roof types and wet areas, ensuring long-lasting defense against water damage with advanced membrane systems.",
                    image: "/assets/images/hero/wallpainting.jpg"
                },
                {
                    title: "Joo Soon Metal Works",
                    subtitle: "Metal Roof Restoration & Protection",
                    description: "Specialized rustproofing and waterproofing services to extend the life of metal roofing systems. From rust treatment to protective coatings, we ensure your roof stands the test of time.",
                    image: "/assets/images/hero/roofing-solutions.jpg"
                }
            ],
            nav: {
                home: "Home",
                about: "About Us",
                services: "Services",
                contact: "Contact Us"
            },
            hero: {
                cta: "Get Free Quote"
            },
            about: {
                title: "About Our Company",
                description1: "With over 18 years of experience in the roofing and construction industry, we've built our reputation on quality workmanship, honest pricing, and exceptional customer service.",
                description2: "Our team of skilled professionals is committed to delivering projects on time and within budget, whether it's a simple repair or a complete renovation.",
                image: "/assets/images/hero/company.jpg",
                stats: {
                    experience: "Years Experience",
                    projects: "Projects Completed",
                    satisfaction: "Satisfaction Rate"
                }
            },
            services: {
                title: "Our Professional Services",
                subtitle: "Comprehensive solutions tailored to your specific construction and maintenance needs",
                categories: {
                    roofing: {
                        title: "Roofing Works",
                        sections: [
                            {
                                title: "Waterproofing Solutions",
                                description: "Comprehensive waterproofing protection for all roof types and wet areas, ensuring long-lasting defense against water damage.",
                                image: "/assets/images/hero/repainting.jpg",
                                points: [
                                    "Flat roof waterproofing with bituminous or liquid membranes",
                                    "Sloped roof protection with underlayment and flashing systems",
                                    "Concrete roof treatments using crystalline or acrylic coatings",
                                    "Wet area waterproofing for bathrooms and balconies",
                                    "Cementitious and liquid-applied membrane solutions"
                                ]
                            },
                            {
                                title: "Metal Roof Protection",
                                description: "Specialized rustproofing and waterproofing services to extend the life of metal roofing systems and prevent corrosion.",
                                image: "/assets/images/hero/drillroof2.jpg",
                                points: [
                                    "Rust-inhibiting primer application for corrosion prevention",
                                    "Elastomeric and polyurethane coating systems",
                                    "UV-resistant and flexible waterproof seals",
                                    "Treatment of seams, fasteners, and exposed edges",
                                    "Regular maintenance and protective reapplication"
                                ]
                            },
                            {
                                title: "Roof Component Services",
                                description: "Complete installation and replacement of essential roofing components to ensure optimal performance and weather protection.",
                                image: "/assets/images/hero/roofinstall.jpg",
                                points: [
                                    "Roofing sheet replacement and installation",
                                    "Skylight installation with proper weatherproofing",
                                    "Gutter and downpipe systems for water management",
                                    "Flashing and capping for joint and edge protection",
                                    "Ridge and valley weatherproofing solutions"
                                ]
                            }
                        ]
                    },
                    walls: {
                        title: "Wall Works",
                        sections: [
                            {
                                title: "Wall Waterproofing",
                                description: "Professional waterproof coating systems for all wall surfaces, providing moisture protection while maintaining breathability.",
                                image: "/assets/images/hero/wallcoat.jpg",
                                points: [
                                    "Plastered wall coating with seamless moisture barriers",
                                    "Tile surface waterproofing for wet areas",
                                    "Brick wall sealing while preserving natural appearance",
                                    "Liquid and cementitious coating applications",
                                    "Interior and exterior moisture protection systems"
                                ]
                            },
                            {
                                title: "External Wall Painting & Protection",
                                description: "High-quality exterior painting services that refresh appearance while providing weather protection and UV resistance.",
                                image: "/assets/images/hero/wallpainting2.jpg",
                                points: [
                                    "Comprehensive surface preparation and cleaning",
                                    "High-quality exterior-grade acrylic paint systems",
                                    "UV-resistant and weatherproof topcoat applications",
                                    "Durability enhancement for temperature fluctuations",
                                    "Long-lasting color retention and fade resistance"
                                ]
                            }
                        ]
                    },
                    restoration: {
                        title: "Structural Restoration",
                        sections: [
                            {
                                title: "Concrete Repair & Sealing",
                                description: "Advanced concrete restoration techniques combining PU grouting and spalling repair to restore structural integrity.",
                                image: "/assets/images/hero/grouting2.jpg",
                                points: [
                                    "PU grouting for active water leak sealing",
                                    "Expanding polyurethane resin injection systems",
                                    "Spalling concrete surface restoration",
                                    "Steel reinforcement treatment and replacement",
                                    "Structural rehabilitation for basements and tunnels"
                                ]
                            },
                            {
                                title: "Specialized Coating & Cleaning",
                                description: "Professional floor coating, window sealing, and façade cleaning services to enhance durability and appearance.",
                                image: "/assets/images/hero/indusfloor.jpg",
                                points: [
                                    "Epoxy and polyurethane floor coating systems",
                                    "Chemical and impact-resistant industrial flooring",
                                    "High-quality silicone window sealant applications",
                                    "Professional façade cleaning and restoration",
                                    "Pressure washing and chemical treatment services"
                                ]
                            }
                        ]
                    }
                },
                cta: "Get a Quote"
            },
            testimonials: {
                title: "What Our Clients Say",
                subtitle: "Don't just take our word for it",
                items: [
                    {
                        name: "John Smith",
                        role: "Homeowner",
                        content: "Excellent work on our roof replacement. The team was professional, efficient, and left our property spotless.",
                        rating: 5
                    },
                    {
                        name: "Sarah Johnson",
                        role: "Business Owner",
                        content: "They repaired our commercial building's roof quickly and within budget. Highly recommend their services!",
                        rating: 5
                    },
                    {
                        name: "Mike Williams",
                        role: "Property Manager",
                        content: "Reliable and trustworthy. They've handled multiple properties for us with consistent quality.",
                        rating: 5
                    }
                ]
            },
            contact: {
                title: "Get Your Free Quote Today",
                subtitle: "Contact us for a no-obligation consultation and estimate",
                form: {
                    name: "Your Name",
                    namePlaceholder: "John Doe",
                    email: "Email Address",
                    emailPlaceholder: "john@example.com",
                    phone: "Phone Number",
                    phonePlaceholder: "(555) 123-4567",
                    service: "Service Needed",
                    servicePlaceholder: "Select a service",
                    serviceOptions: [
                        { value: "roofing-works", label: "Roofing Works" },
                        { value: "wall-works", label: "Wall Works" },
                        { value: "structural-restoration", label: "Structural Restoration" },
                        { value: "other", label: "Other" }
                    ],
                    message: "Message",
                    messagePlaceholder: "Tell us about your project...",
                    submit: "Send Message"
                },
                info: {
                    emergency: "Contact Us",
                    phone: "+65 9226 7756",
                    emailLabel: "Email Us",
                    email: "joosoonmetal@gmail.com",
                    location: "Address",
                    area: "7 Mandai Link, Mandai Connection, #03-05, Singapore 728653",
                }
            },
            footer: {
                companyName: "JOO SOON METAL WORKS PTE. LTD.",
                description: "Joo Soon Metal Works specializes in providing professional solutions to building maintenance problems. We provide the following services for private condominiums, commercial and industrial buildings, hotels and government facilities.",
                quickLinks: {
                    title: "Quick Links",
                    home: "Home",
                    about: "About Us",
                    services: "Services",
                    industries: "Industries Served",
                    projects: "Our Projects",
                    testimonials: "Our Testimonials",
                    certifications: "Certifications & Safety",
                    careers: "Careers",
                    news: "News / Insights",
                    contact: "Contact Us"
                },
                servicesSection: {
                    title: "Services",
                    waterproofing: "Waterproofing to different types of roofs and wet areas",
                    wallCoating: "Wall waterproof coating to plastered, tiled or brick surface",
                    repainting: "Repainting to external wall",
                    rustproofing: "Rustproofing and waterproofing to metal roofs",
                    metalWorks: "Other related metal roof works: replacement of roofing sheets, skylights, gutters, flashing, capping, downpipes, etc",
                    puGrouting: "PU grouting and repair to spalling concrete",
                    floorCoating: "Factory and carpark floor coating, Window Sealant, Façade Cleaning",
                    windowSealant: "External window and cladding sealant works"
                },
                address: {
                    title: "Address",
                    street: "7 Mandai Link #03-05 Mandai Connection, Singapore 728653"
                },
                contactUs: {
                    title: "Contact us",
                    phone: "Phone number",
                    phoneNumber: "+65 9226 7756",
                    email: "Email",
                    emailAddress: "joosoonmetal@gmail.com"
                },
                copyright: "© 2024 Joo Soon Metal Works Pte. Ltd. All rights reserved."
            }
        },
        zh: {
            slides: [
                {
                    title: "Joo Soon Metal Works",
                    subtitle: "值得信赖的专业防水解决方案", // "Trusted Professional Waterproofing Solutions"
                    description: "为您的所有屋顶需求提供优质工艺、可靠服务和具有竞争力的价格。",
                    image: "/assets/images/hero/wallpainting.jpg"
                },
                {
                    title: "Joo Soon Metal Works",
                    subtitle: "金属屋顶修复与保护专家", // "Metal Roof Restoration & Protection Specialists"
                    description: "从维修到全面更换，我们以专业技能处理住宅和商业屋顶项目。",
                    image: "/assets/images/hero/roofing-solutions.jpg"
                }
            ],
            nav: {
                home: "首页",
                about: "关于我们",
                services: "服务",
                contact: "联系我们"
            },
            hero: {
                cta: "获取免费报价"
            },
            about: {
                title: "关于我们的公司",
                description1: "凭借18年在屋顶和建筑行业的经验，我们以优质工艺、诚实定价和卓越客户服务建立了声誉。",
                description2: "我们的专业团队致力于按时、按预算交付项目，无论是简单的维修还是完整的改造。",
                image: "/assets/images/hero/company.jpg",
                stats: {
                    experience: "年经验",
                    projects: "完成项目",
                    satisfaction: "满意度"
                }
            },
            services: {
                title: "我们的专业服务",
                subtitle: "为您的特定建筑和维护需求量身定制的全面解决方案",
                categories: {
                    roofing: {
                        title: "屋顶工程",
                        sections: [
                            {
                                title: "防水解决方案",
                                description: "为所有屋顶类型和潮湿区域提供全面的防水保护，确保持久防止水损害。",
                                image: "/assets/images/hero/repainting.jpg",
                                points: [
                                    "使用沥青或液体膜的平屋顶防水",
                                    "使用底层和闪光系统的斜屋顶保护",
                                    "使用结晶或丙烯酸涂层的混凝土屋顶处理",
                                    "浴室和阳台等潮湿区域防水",
                                    "水泥基和液体施工膜解决方案"
                                ]
                            },
                            {
                                title: "金属屋顶保护",
                                description: "专业的防锈和防水服务，延长金属屋顶系统的使用寿命，防止腐蚀。",
                                image: "/assets/images/hero/drillroof2.jpg",
                                points: [
                                    "防锈底漆应用以防止腐蚀",
                                    "弹性和聚氨酯涂层系统",
                                    "抗紫外线和柔性防水密封",
                                    "接缝、紧固件和暴露边缘的处理",
                                    "定期维护和保护性重新涂装"
                                ]
                            },
                            {
                                title: "屋顶组件服务",
                                description: "完整安装和更换基本屋顶组件，确保最佳性能和天气保护。",
                                image: "/assets/images/hero/roofinstall.jpg",
                                points: [
                                    "屋顶板更换和安装",
                                    "天窗安装和适当的防水",
                                    "用于水管理的排水沟和落水管系统",
                                    "接缝和边缘保护的闪光和封盖",
                                    "屋脊和屋谷防水解决方案"
                                ]
                            }
                        ]
                    },
                    walls: {
                        title: "墙体工程",
                        sections: [
                            {
                                title: "墙体防水",
                                description: "为所有墙面提供专业防水涂层系统，在保持透气性的同时提供防潮保护。",
                                image: "/assets/images/hero/wallcoat.jpg",
                                points: [
                                    "抹灰墙涂层配备无缝防潮屏障",
                                    "潮湿区域的瓷砖表面防水",
                                    "砖墙密封同时保持自然外观",
                                    "液体和水泥基涂层应用",
                                    "室内外防潮保护系统"
                                ]
                            },
                            {
                                title: "外墙涂装与保护",
                                description: "高质量的外墙涂装服务，既能刷新外观，又能提供天气保护和抗紫外线功能。",
                                image: "/assets/images/hero/wallpainting2.jpg",
                                points: [
                                    "全面的表面准备和清洁",
                                    "高质量外墙级丙烯酸涂料系统",
                                    "抗紫外线和防风雨顶涂层应用",
                                    "温度波动的耐久性增强",
                                    "持久的颜色保持和抗褪色性"
                                ]
                            }
                        ]
                    },
                    restoration: {
                        title: "结构修复",
                        sections: [
                            {
                                title: "混凝土修复与密封",
                                description: "结合PU灌浆和剥落修复的先进混凝土修复技术，恢复结构完整性。",
                                image: "/assets/images/hero/grouting2.jpg",
                                points: [
                                    "PU灌浆用于活跃漏水密封",
                                    "膨胀聚氨酯树脂注入系统",
                                    "剥落混凝土表面修复",
                                    "钢筋处理和更换",
                                    "地下室和隧道的结构修复"
                                ]
                            },
                            {
                                title: "专业涂层与清洁",
                                description: "专业的地面涂层、窗户密封和外墙清洁服务，增强耐久性和外观。",
                                image: "/assets/images/hero/indusfloor.jpg",
                                points: [
                                    "环氧和聚氨酯地面涂层系统",
                                    "抗化学和抗冲击工业地面",
                                    "高质量硅胶窗户密封剂应用",
                                    "专业外墙清洁和修复",
                                    "压力清洗和化学处理服务"
                                ]
                            }
                        ]
                    }
                },
                cta: "获取报价"
            },
            testimonials: {
                title: "客户评价",
                subtitle: "不要只听我们说",
                items: [
                    {
                        name: "约翰·史密斯",
                        role: "房主",
                        content: "我们的屋顶更换工作非常出色。团队专业、高效，并保持我们的财产一尘不染。",
                        rating: 5
                    },
                    {
                        name: "莎拉·约翰逊",
                        role: "企业主",
                        content: "他们快速并在预算内修复了我们商业建筑的屋顶。强烈推荐他们的服务！",
                        rating: 5
                    },
                    {
                        name: "迈克·威廉姆斯",
                        role: "物业经理",
                        content: "可靠且值得信赖。他们为我们处理了多个物业，质量始终如一。",
                        rating: 5
                    }
                ]
            },
            contact: {
                title: "立即获取免费报价",
                subtitle: "联系我们获取无义务咨询和估价",
                form: {
                    name: "您的姓名",
                    namePlaceholder: "张三",
                    email: "电子邮箱",
                    emailPlaceholder: "zhang@example.com",
                    phone: "电话号码",
                    phonePlaceholder: "+65 1234 5678",
                    service: "所需服务",
                    servicePlaceholder: "选择服务",
                    serviceOptions: [
                        { value: "roofing-works", label: "屋顶工程" },
                        { value: "wall-works", label: "墙体工程" },
                        { value: "structural-restoration", label: "结构修复" },
                        { value: "other", label: "其他" }
                    ],
                    message: "信息",
                    messagePlaceholder: "告诉我们您的项目...",
                    submit: "发送信息"
                },
                info: {
                    emergency: "24/7 紧急服务",
                    phone: "+65 9226 7756",
                    emailLabel: "发邮件给我们",
                    email: "joosoonmetal@gmail.com",
                    location: "服务区域",
                    area: "新加坡全岛"
                }
            },
            footer: {
                companyName: "Joo Soon Metal Works",
                description: "Joo Soon Metal Works专门为建筑维护问题提供专业解决方案。我们为私人公寓、商业和工业建筑、酒店和政府设施提供以下服务。",
                quickLinks: {
                    title: "快速链接",
                    home: "首页",
                    about: "关于我们",
                    services: "服务",
                    industries: "服务行业",
                    projects: "我们的项目",
                    testimonials: "客户推荐",
                    certifications: "认证与安全",
                    careers: "职业机会",
                    news: "新闻/见解",
                    contact: "联系我们"
                },
                servicesSection: {
                    title: "服务",
                    waterproofing: "不同类型屋顶和潮湿区域的防水",
                    wallCoating: "抹灰、瓷砖或砖面的墙体防水涂层",
                    repainting: "外墙重新涂装",
                    rustproofing: "金属屋顶的防锈和防水",
                    metalWorks: "其他相关金属屋顶工程：更换屋顶板、天窗、排水沟、闪光、封盖、落水管等",
                    puGrouting: "PU灌浆和剥落混凝土修复",
                    floorCoating: "工厂和停车场地面涂层、窗户密封剂、外墙清洁",
                    windowSealant: "外窗和包层密封工程"
                },
                address: {
                    title: "地址",
                    street: "7 Mandai Link #03-05 Mandai Connection, Singapore 728653"
                },
                contactUs: {
                    title: "联系我们",
                    phone: "电话号码",
                    phoneNumber: "+65 9226 7756",
                    email: "邮箱",
                    emailAddress: "joosoonmetal@gmail.com"
                },
                copyright: "© 2024 Joo Soon Metal Works. 保留所有权利。"
            }
        }
    };

    const slides = content[language].slides;
    const testimonials = content[language].testimonials.items;
    const serviceCategories = content[language].services.categories;

    useEffect(() => {
        log('Landing page component mounted');

        const handleError = (error: unknown) => {
            if (error instanceof Error) {
                log(`Global error caught: ${error.message}`, 'error');
                log(`Stack trace: ${error.stack}`, 'error');
            } else {
                log(`Global error caught: ${String(error)}`, 'error');
            }
        };


        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
            log('Landing page component unmounted');
        };
    }, []);


    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => {
                const next = (prev + 1) % slides.length;
                log(`Title carousel advanced to slide ${next}`);
                return next;
            });
        }, 5000);

        return () => clearInterval(slideInterval);
    }, [slides.length]);

    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            setTestimonialSlide((prev) => {
                const next = (prev + 1) % testimonials.length;
                log(`Testimonial carousel advanced to slide ${next}`);
                return next;
            });
        }, 6000);

        return () => clearInterval(testimonialInterval);
    }, [testimonials.length]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target.id) {
                    setVisibleSections((prev) => ({
                        ...prev,
                        [entry.target.id]: true
                    }));
                    log(`Section ${entry.target.id} became visible`);
                }
            });
        }, observerOptions);

        const timeoutId = setTimeout(() => {
            Object.values(sectionRefs.current).forEach((ref) => {
                if (ref) observer.observe(ref);
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, []);

    // REPLACE with this fixed version:
    useEffect(() => {
        const preloadCriticalImages = async () => {
            const criticalImages = [
                slides[0]?.image,
                slides[1]?.image,
                serviceCategories.roofing?.sections[0]?.image
            ].filter(Boolean);

            // Only preload images that aren't already loaded
            const imagesToLoad = criticalImages.filter(src => !imagesLoaded[src]);

            if (imagesToLoad.length === 0) {
                return; // All images already loaded, skip
            }

            log(`Preloading ${imagesToLoad.length} critical images`);

            const loadPromises = imagesToLoad.map(src => {
                return new Promise((resolve) => {
                    const img = new window.Image();
                    img.onload = () => {
                        setImagesLoaded(prev => ({ ...prev, [src]: true }));
                        resolve(src);
                    };
                    img.onerror = () => resolve(src);
                    img.src = src;
                });
            });

            await Promise.all(loadPromises);
            log('Critical images preloaded');
        };

        // Only run once on component mount
        preloadCriticalImages();
    }, []); // Empty dependency array - only runs once!

    // REPLACE with this optimized version:
    useEffect(() => {
        const preloadTabImages = () => {
            const tabImages = serviceCategories[activeServiceTab]?.sections.map(section => section.image) || [];

            // Only preload images that aren't already loaded or being loaded
            const imagesToLoad = tabImages.filter(imageSrc =>
                imageSrc && !imagesLoaded[imageSrc]
            );

            if (imagesToLoad.length === 0) {
                return; // All tab images already loaded
            }

            log(`Preloading ${imagesToLoad.length} images for ${activeServiceTab} tab`);

            imagesToLoad.forEach(imageSrc => {
                const img = new window.Image();
                img.onload = () => setImagesLoaded(prev => ({ ...prev, [imageSrc]: true }));
                img.onerror = () => log(`Failed to load image: ${imageSrc}`, 'warn');
                img.src = imageSrc;
            });
        };

        // Small delay to prevent rapid firing when user quickly switches tabs
        const timeoutId = setTimeout(preloadTabImages, 100);
        return () => clearTimeout(timeoutId);
    }, [activeServiceTab]); // Only depend on activeServiceTab, not imagesLoaded


    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        log('Contact form submitted via Formspree');

        // Call Formspree's handleSubmit
        await handleSubmit(e);

        // Check if submission was successful
        if (state.succeeded) {
            log('Form successfully submitted to Formspree');
            // Form will be reset automatically by Formspree
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            {/* Hero Section with Carousel */}
            <section className="relative h-screen text-white">
                {/* Background Images - REPLACE the existing hero image section */}
                <div className="absolute inset-0">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            {/* Loading placeholder */}
                            {!imagesLoaded[slide.image] && (
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                </div>
                            )}

                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className={`object-cover transition-opacity duration-500 ${imagesLoaded[slide.image] ? 'opacity-70' : 'opacity-0'
                                    }`}
                                priority={index === 0}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                sizes="100vw"
                                quality={85}
                                onLoad={() => setImagesLoaded(prev => ({ ...prev, [slide.image]: true }))}
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center px-4">
                    <div className="container mx-auto">
                        <div className="relative w-full max-w-4xl mx-auto">
                            {/* Carousel Content */}
                            <div className="relative h-[70vh] min-h-[400px] flex items-center">
                                {slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 flex items-center transition-all duration-1000 ${index === currentSlide
                                            ? 'opacity-100'
                                            : 'opacity-0 pointer-events-none'
                                            }`}
                                    >
                                        <div className="w-full px-4 space-y-6">
                                            {/* Desktop Layout - Left Aligned with Gradient Background */}
                                            <div className="hidden md:block">
                                                <div className="inline-block bg-gradient-to-r from-black/70 to-transparent p-6 rounded-lg max-w-2xl">
                                                    <h1 className="text-4xl md:text-6xl font-bold pb-2 leading-tight whitespace-nowrap">
                                                        {slide.title}
                                                    </h1>
                                                    <h2 className="text-xl md:text-2xl text-orange-300 mb-4">
                                                        {slide.subtitle}
                                                    </h2>
                                                    <p className="text-lg text-gray-300">
                                                        {slide.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Mobile Layout - Centered */}
                                            <div className="md:hidden text-center">
                                                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 pb-2 leading-tight">
                                                    {slide.title}
                                                </h1>
                                                <h2 className="text-xl text-orange-300 mb-4">
                                                    {slide.subtitle}
                                                </h2>
                                                <p className="text-lg text-gray-300">
                                                    {slide.description}
                                                </p>
                                            </div>

                                            <div className="pt-4 text-center md:text-left">
                                                <button
                                                    onClick={() => {
                                                        const contactSection = document.getElementById('contact');
                                                        contactSection?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
                                                >
                                                    {content[language].hero.cta}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Carousel Controls */}
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/50'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section
                id="about"
                ref={(el) => {
                    sectionRefs.current.about = el;
                }}

                className="py-20 bg-white"
            >
                <div className="container mx-auto px-4">
                    <div className={`grid md:grid-cols-2 gap-12 items-center ${visibleSections.about ? 'animate-slideInLeft' : 'opacity-0'
                        }`}>
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-gray-800">{content[language].about.title}</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {content[language].about.description1}
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {content[language].about.description2}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-orange-500">15+</div>
                                    <div className="text-gray-600">{content[language].about.stats.experience}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-orange-500">500+</div>
                                    <div className="text-gray-600">{content[language].about.stats.projects}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-orange-500">100%</div>
                                    <div className="text-gray-600">{content[language].about.stats.satisfaction}</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                            {/* Loading placeholder */}
                            {!imagesLoaded[about.image] && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse flex items-center justify-center">
                                                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}

                            <Image
                                src={content[language].about.image}
                                alt={content[language].about.title}
                                fill
                                className={`object-cover transition-opacity duration-500 ${imagesLoaded[about.image] ? 'opacity-100' : 'opacity-0'
                                    }`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={index === 0 && activeServiceTab === 'roofing'}
                                quality={80}
                                onLoad={() => setImagesLoaded(prev => ({ ...prev, [about.image]: true }))}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section with Tabs */}
            <section id="services" ref={(el) => {
                sectionRefs.current.services = el;
            }}
                className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className={`mb-12 ${visibleSections.services ? 'animate-fadeIn' : 'opacity-0'}`}>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center md:text-left md:pl-8">
                            {content[language].services.title}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center md:text-left md:mx-0 md:pl-8">
                            {content[language].services.subtitle}
                        </p>
                    </div>

                    {/* Tabs - Scrollable on mobile, better spacing */}
                    <div className="flex justify-center md:justify-start mb-8 md:mb-12 px-2">
                        <div className="bg-white rounded-xl p-1 shadow-lg inline-flex max-w-full overflow-x-auto">
                            {(Object.entries(serviceCategories) as [ServiceCategoryKey, typeof serviceCategories[keyof typeof serviceCategories]][])
                                .map(([key, category]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveServiceTab(key)}
                                        className={`px-4 py-3 md:px-6 md:py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap min-w-max ${activeServiceTab === key
                                            ? 'bg-orange-500 text-white shadow-md'
                                            : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                                            }`}
                                    >
                                        {category.title}
                                    </button>
                                ))}
                        </div>
                    </div>
                    {/* Service Content - Left/right on desktop, stacked on mobile */}

                    {serviceCategories[activeServiceTab].sections.map((service, index) => (
                        <div
                            key={index}
                            className={`mb-16 last:mb-0 transition-all duration-500 ${visibleSections.services ? 'animate-fadeIn' : 'opacity-0'}`}
                        >
                            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                                <div className="w-full md:w-1/2">
                                    <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
                                        {/* Loading placeholder for service images */}
                                        {!imagesLoaded[service.image] && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse flex items-center justify-center">
                                                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}

                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className={`object-cover transition-opacity duration-500 ${imagesLoaded[service.image] ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority={index === 0 && activeServiceTab === 'roofing'}
                                            quality={80}
                                            onLoad={() => setImagesLoaded(prev => ({ ...prev, [service.image]: true }))}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-4 md:px-0">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                    <ul className="space-y-3 mb-6">
                                        {service.points.map((point: string, pointIndex: number) => (
                                            <li key={pointIndex} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                                                <span className="text-gray-600">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => {
                                            const contactSection = document.getElementById('contact');
                                            contactSection?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-orange-500 font-semibold flex items-center gap-2 hover:gap-4 transition-all hover:text-orange-600"
                                    >
                                        {content[language].services.cta} <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Testimonials Section */}
            <section
                id="testimonials"
                ref={(el) => {
                    sectionRefs.current.testimonials = el;
                }}
                className="py-20 bg-white"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">{content[language].testimonials.title}</h2>
                        <p className="text-lg text-gray-600">{content[language].testimonials.subtitle}</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${testimonialSlide * 100}%)` }}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className={`w-full flex-shrink-0 px-4 ${visibleSections.testimonials ? 'animate-fadeIn' : 'opacity-0'
                                            }`}
                                    >
                                        <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
                                            <div className="flex mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                            <p className="text-lg text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial Navigation */}
                        <button
                            onClick={() => {
                                setTestimonialSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                                log('Testimonial carousel: previous slide');
                            }}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => {
                                setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
                                log('Testimonial carousel: next slide');
                            }}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                ref={(el) => {
                    sectionRefs.current.contact = el;
                }}
                className="py-20 bg-gradient-to-br from-slate-900 to-slate-700 text-white"
            >
                <div className="container mx-auto px-4">
                    <div className={`max-w-4xl mx-auto ${visibleSections.contact ? 'animate-fadeIn' : 'opacity-0'
                        }`}>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">{content[language].contact.title}</h2>
                            <p className="text-lg text-gray-300">
                                {content[language].contact.subtitle}
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl">
                            <form
                                onSubmit={handleFormSubmit}
                                className="space-y-6"
                            >
                                {/* Success Message */}
                                {state.succeeded && (
                                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-6">
                                        <p className="text-green-100 text-center font-semibold">
                                            Thank you! Your message has been sent successfully. We'll get back to you soon!
                                        </p>
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            {content[language].contact.form.name}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder={content[language].contact.form.namePlaceholder}
                                        />
                                        <ValidationError
                                            prefix="Name"
                                            field="name"
                                            errors={state.errors}
                                            className="text-red-300 text-sm mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            {content[language].contact.form.email}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder={content[language].contact.form.emailPlaceholder}
                                        />
                                        <ValidationError
                                            prefix="Email"
                                            field="email"
                                            errors={state.errors}
                                            className="text-red-300 text-sm mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                            {content[language].contact.form.phone}
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder={content[language].contact.form.phonePlaceholder}
                                        />
                                        <ValidationError
                                            prefix="Phone"
                                            field="phone"
                                            errors={state.errors}
                                            className="text-red-300 text-sm mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="service" className="block text-sm font-medium mb-2">
                                            {content[language].contact.form.service}
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 0.5rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.5em 1.5em'
                                            }}
                                        >
                                            <option value="" style={{ backgroundColor: '#1e293b', color: '#e2e8f0' }}>
                                                {content[language].contact.form.servicePlaceholder}
                                            </option>
                                            {content[language].contact.form.serviceOptions.map((option, index) => (
                                                <option key={index} value={option.value} style={{ backgroundColor: '#1e293b', color: '#e2e8f0' }}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ValidationError
                                            prefix="Service"
                                            field="service"
                                            errors={state.errors}
                                            className="text-red-300 text-sm mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        {content[language].contact.form.message}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder={content[language].contact.form.messagePlaceholder}
                                    ></textarea>
                                    <ValidationError
                                        prefix="Message"
                                        field="message"
                                        errors={state.errors}
                                        className="text-red-300 text-sm mt-1"
                                    />
                                </div>

                                {/* General form errors */}
                                <ValidationError
                                    errors={state.errors}
                                    className="text-red-300 text-sm text-center"
                                />

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        disabled={state.submitting}
                                        className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all transform shadow-lg ${state.submitting
                                            ? 'bg-gray-500 cursor-not-allowed'
                                            : 'bg-orange-500 hover:bg-orange-600 hover:scale-105'
                                            } text-white`}
                                    >
                                        {state.submitting ? 'Sending...' : content[language].contact.form.submit}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/20">
                                <div className="grid md:grid-cols-3 gap-6 text-center">
                                    <div className="flex flex-col items-center">
                                        <Phone className="w-6 h-6 mb-2 text-orange-400" />
                                        <p className="text-sm text-gray-300">{content[language].contact.info.emergency}</p>
                                        <p className="font-semibold">{content[language].contact.info.phone}</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Mail className="w-6 h-6 mb-2 text-orange-400" />
                                        <p className="text-sm text-gray-300">{content[language].contact.info.emailLabel}</p>
                                        <p className="font-semibold">{content[language].contact.info.email}</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <MapPin className="w-6 h-6 mb-2 text-orange-400" />
                                        <p className="text-sm text-gray-300">{content[language].contact.info.location}</p>
                                        <p className="font-semibold">{content[language].contact.info.area}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WhatsApp Floating Button */}
            <div className="fixed bottom-20 right-6 z-50">
                <a
                    href="https://wa.me/6592267756?text=I%20need%20a%20quotation%20for%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center group"
                    title="Chat with us on WhatsApp"
                >
                    {/* WhatsApp Icon SVG */}
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="transition-transform group-hover:scale-110"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>

                    {/* Pulse animation */}
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
                </a>
            </div>

            {/* Language Toggle Button - Update positioning */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => {
                        setLanguage(language === 'en' ? 'zh' : 'en');
                        log(`Language switched to: ${language === 'en' ? 'Chinese' : 'English'}`);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-medium"
                >
                    <span className="text-sm">{language === 'en' ? '中文' : 'EN'}</span>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <span className="text-sm">{language === 'en' ? 'EN' : '中文'}</span>
                </button>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        {/* Company Section */}
                        <div className="md:col-span-1">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-xl">JS</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">{content[language].footer.companyName}</h3>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed mb-6">
                                {content[language].footer.description}
                            </p>
                            <div className="flex space-x-3">
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="md:col-span-2">
                            <h4 className="font-bold text-lg mb-6 text-orange-400">{content[language].footer.servicesSection.title}</h4>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{content[language].footer.servicesSection.waterproofing}</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{content[language].footer.servicesSection.rustproofing}</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{content[language].footer.servicesSection.wallCoating}</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{content[language].footer.servicesSection.metalWorks}</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{content[language].footer.servicesSection.repainting}</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{content[language].footer.servicesSection.puGrouting}</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{content[language].footer.servicesSection.floorCoating}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-orange-400">{content[language].footer.contactUs.title}</h4>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">{content[language].footer.address.title}</p>
                                        <p className="text-sm text-gray-400">{content[language].footer.address.street}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Phone className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">Andy Ko</p>
                                        <a href="tel:+6597307219" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">+65 9730 7219</a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Phone className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">Ivy</p>
                                        <a href="tel:+6592267756" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">+65 9226 7756</a>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="mt-8">
                                    <h4 className="font-bold text-sm mb-3 text-gray-300">{content[language].footer.quickLinks.title}</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">{content[language].footer.quickLinks.home}</a>
                                        <a href="#about" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">{content[language].footer.quickLinks.about}</a>
                                        <a href="#services" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">{content[language].footer.quickLinks.services}</a>
                                        <a href="#contact" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">{content[language].footer.quickLinks.contact}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-gray-700 pt-8">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <p className="text-sm text-gray-400 mb-4 md:mb-0">{content[language].footer.copyright}</p>
                                <div className="flex items-center space-x-4">
                                    <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
                                    <span className="text-gray-600">|</span>
                                    <a href="#" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <style jsx>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideInLeft {
      from { 
        opacity: 0;
        transform: translateX(-50px);
      }
      to { 
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from { 
        opacity: 0;
        transform: translateX(50px);
      }
      to { 
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 1s ease-out forwards;
    }
    
    .animate-slideInLeft {
      animation: slideInLeft 0.8s ease-out forwards;
    }
    
    .animate-slideInRight {
      animation: slideInRight 0.8s ease-out forwards;
    }
  `}</style>
        </div>
    );
}