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
            canopy: {
                title: string;
                description: string;
                mainImage: string;
                textContent: string;
                galleryImages: string[];
            };
            metalRoof: {
                title: string;
                description: string;
                mainImage: string;
                textContent: string;
                galleryImages: string[];
            };
            gutter: {
                title: string;
                description: string;
                mainImage: string;
                textContent: string;
                galleryImages: string[];
            };
            downpipe: {
                title: string;
                description: string;
                mainImage: string;
                textContent: string;
                galleryImages: string[];
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
    const [activeServiceTab, setActiveServiceTab] = useState<ServiceCategoryKey>('canopy');
    const [language, setLanguage] = useState<LanguageKey>('en');
    const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const [state, handleSubmit] = useForm("mblovkgv");
    const [modalImage, setModalImage] = useState<string | null>(null);

    // Define service categories keys for roof services only
    type ServiceCategoryKey = 'canopy' | 'metalRoof' | 'gutter' | 'downpipe';

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
                    title: "Joo Soon Metal Works Pte Ltd",
                    subtitle: "Professional Roof Solutions",
                    description: "Comprehensive roofing services including canopy works, metal roof installations, gutter systems, and downpipe solutions for residential and commercial properties.",
                    image: "/assets/images/hero/wallpainting.jpg"
                },
                {
                    title: "Joo Soon Metal Works Pte Ltd",
                    subtitle: "Expert Roof Maintenance & Installation",
                    description: "Specialized in roof canopy construction, metal roofing systems, and complete water drainage solutions. Quality workmanship with long-lasting results.",
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
                title: "Our Roofing Services",
                subtitle: "Comprehensive roof solutions tailored to your specific needs",
                cta: "Get a Quote",
                categories: {
                    canopy: {
                        title: "Roof Canopy Works",
                        description: "Professional installation and maintenance of roof canopies for enhanced weather protection and aesthetic appeal.",
                        mainImage: "/assets/images/canopy/after_1.jpg",
                        textContent: "Our roof canopy services provide effective weather protection while enhancing the architectural appeal of your property. We specialize in custom canopy designs that seamlessly integrate with existing structures, offering both functional benefits and visual enhancement. Our experienced team ensures proper installation with attention to structural integrity, drainage, and long-term durability. From residential walkways to commercial building entrances, we deliver canopy solutions that withstand Singapore's tropical climate while maintaining their aesthetic appeal for years to come.",
                        galleryImages: [
                            "/assets/images/canopy/after_2.jpg",
                            "/assets/images/canopy/before_1.jpg",
                            "/assets/images/canopy/before_2.jpg"
                        ]
                    },
                    metalRoof: {
                        title: "Metal Roof Works",
                        description: "Complete metal roofing solutions including installation, replacement, restoration, and protective coating applications.",
                        mainImage: "/assets/images/replace_metal_roof/after_1.jpg",
                        textContent: "Our metal roofing services cover everything from new installations to comprehensive restoration projects. We work with various metal roofing materials including corrugated sheets, standing seam systems, and specialized industrial roofing solutions. Our expertise includes rust treatment, protective coating applications, and structural reinforcement to extend roof life significantly. Whether you need complete roof replacement or targeted repairs, our team delivers solutions that provide excellent weather resistance, energy efficiency, and long-term value for your investment.",
                        galleryImages: [
                            "/assets/images/replace_metal_roof/after_2.jpg",
                            "/assets/images/replace_metal_roof/after_3.jpg",
                            "/assets/images/replace_metal_roof/before_1.jpg",
                            "/assets/images/replace_metal_roof/before_2.jpg",
                            "/assets/images/replace_metal_roof/before_3.jpg"
                        ]
                    },
                    gutter: {
                        title: "Gutter Works",
                        description: "Professional gutter installation, replacement, and maintenance services to ensure proper water drainage and building protection.",
                        mainImage: "/assets/images/replace_gutter/after_1_1.jpg",
                        textContent: "Proper gutter systems are essential for protecting your property from water damage. Our gutter services include installation of new systems, replacement of damaged gutters, and comprehensive maintenance programs. We work with various gutter materials and profiles to match your specific requirements and architectural style. Our installations ensure optimal water flow, proper slope calculations, and secure mounting systems that withstand heavy rainfall and strong winds common in Singapore's climate.",
                        galleryImages: [
                            "/assets/images/replace_gutter/after_1_2.jpg",
                            "/assets/images/replace_gutter/after_2_1.jpg",
                            "/assets/images/replace_gutter/after_2_2.jpg",
                            "/assets/images/replace_gutter/before_1_1.jpg",
                            "/assets/images/replace_gutter/before_2_1.jpg"
                        ]
                    },
                    downpipe: {
                        title: "Downpipe Works",
                        description: "Complete downpipe systems installation and maintenance for effective rainwater management and drainage solutions.",
                        mainImage: "/assets/images/replace_downpipe/after_1.jpg",
                        textContent: "Effective downpipe systems are crucial for directing rainwater away from your building's foundation and preventing water-related damage. Our downpipe services encompass design, installation, and maintenance of complete drainage systems. We ensure proper sizing, optimal placement, and secure mounting to handle Singapore's intense rainfall patterns. Our solutions include both visible and concealed downpipe installations, with options for decorative finishes that complement your building's architecture while maintaining superior functionality.",
                        galleryImages: [
                            "/assets/images/replace_downpipe/after_2.jpg",
                            "/assets/images/replace_downpipe/after_3.jpg",
                            "/assets/images/replace_downpipe/before_1.jpg",
                            "/assets/images/replace_downpipe/before_2.jpg",
                            "/assets/images/replace_downpipe/before_3.jpg"
                        ]
                    }
                }
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
                        { value: "canopy-works", label: "Roof Canopy Works" },
                        { value: "metal-roof-works", label: "Metal Roof Works" },
                        { value: "gutter-works", label: "Gutter Works" },
                        { value: "downpipe-works", label: "Downpipe Works" },
                        { value: "other", label: "Other" }
                    ],
                    message: "Message",
                    messagePlaceholder: "Tell us about your project...",
                    submit: "Send Message"
                },
                info: {
                    emergency: "Contact Us",
                    phone: "+65 9730 7219",
                    emailLabel: "Email Us",
                    email: "joosoonmetal@gmail.com",
                    location: "Address",
                    area: "7 Mandai Link, Mandai Connection, #03-05, Singapore 728653",
                }
            },
            footer: {
                companyName: "Joo Soon Metal Works Pte Ltd",
                description: "Joo Soon Metal Works specializes in providing professional roofing solutions. We provide comprehensive roof services including canopy works, metal roof installations, gutter systems, and downpipe solutions for private condominiums, commercial and industrial buildings, hotels and government facilities.",
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
                    title: "Roofing Services",
                    waterproofing: "Roof canopy works and installation",
                    wallCoating: "Metal roof replacement and restoration",
                    repainting: "Gutter installation and maintenance",
                    rustproofing: "Downpipe systems and drainage solutions",
                    metalWorks: "Roof waterproofing and protective coatings",
                    puGrouting: "Structural roof repairs and reinforcement",
                    floorCoating: "Roof inspection and maintenance services",
                    windowSealant: "Emergency roof repair services"
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
                    title: "Joo Soon Metal Works Pte Ltd",
                    subtitle: "专业屋顶解决方案",
                    description: "全面的屋顶服务，包括遮篷工程、金属屋顶安装、排水沟系统和落水管解决方案，适用于住宅和商业物业。",
                    image: "/assets/images/hero/wallpainting.jpg"
                },
                {
                    title: "Joo Soon Metal Works Pte Ltd",
                    subtitle: "专业屋顶维护与安装",
                    description: "专业从事屋顶遮篷建设、金属屋顶系统和完整的排水解决方案。优质工艺，持久效果。",
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
                description1: "凭借18年在屋顶和建筑行业的经验, 我们以优质工艺、诚实定价和卓越客户服务建立了声誉。",
                description2: "我们的专业团队致力于按时、按预算交付项目，无论是简单的维修还是完整的改造。",
                image: "/assets/images/hero/company.jpg",
                stats: {
                    experience: "年经验",
                    projects: "完成项目",
                    satisfaction: "满意度"
                }
            },
            services: {
                title: "我们的屋顶服务",
                subtitle: "为您的特定需求量身定制的全面屋顶解决方案",
                cta: "获取报价",
                categories: {
                    canopy: {
                        title: "屋顶遮篷工程",
                        description: "专业的屋顶遮篷安装和维护，提供增强的天气保护和美观效果。",
                        mainImage: "/assets/images/canopy/after_1.jpg",
                        textContent: "我们的屋顶遮篷服务提供有效的天气保护，同时增强您物业的建筑美感。我们专门设计定制遮篷，与现有结构无缝集成，既提供功能性好处又增强视觉效果。我们经验丰富的团队确保正确安装，注重结构完整性、排水和长期耐用性。从住宅走道到商业建筑入口，我们提供能够承受新加坡热带气候的遮篷解决方案，同时多年保持美观效果。",
                        galleryImages: [
                            "/assets/images/canopy/after_2.jpg",
                            "/assets/images/canopy/before_1.jpg",
                            "/assets/images/canopy/before_2.jpg"
                        ]
                    },
                    metalRoof: {
                        title: "金属屋顶工程",
                        description: "完整的金属屋顶解决方案，包括安装、更换、修复和保护涂层应用。",
                        mainImage: "/assets/images/replace_metal_roof/after_1.jpg",
                        textContent: "我们的金属屋顶服务涵盖从新安装到全面修复项目的所有内容。我们使用各种金属屋顶材料，包括波纹板、立缝系统和专业工业屋顶解决方案。我们的专业知识包括防锈处理、保护涂层应用和结构加固，以显著延长屋顶寿命。无论您需要完整的屋顶更换还是针对性维修，我们的团队都能提供出色的耐候性、能效和长期投资价值的解决方案。",
                        galleryImages: [
                            "/assets/images/replace_metal_roof/after_2.jpg",
                            "/assets/images/replace_metal_roof/after_3.jpg",
                            "/assets/images/replace_metal_roof/before_1.jpg",
                            "/assets/images/replace_metal_roof/before_2.jpg",
                            "/assets/images/replace_metal_roof/before_3.jpg"
                        ]
                    },
                    gutter: {
                        title: "排水沟工程",
                        description: "专业的排水沟安装、更换和维护服务，确保适当的排水和建筑保护。",
                        mainImage: "/assets/images/replace_gutter/after_1_1.jpg",
                        textContent: "适当的排水沟系统对于保护您的财产免受水损害至关重要。我们的排水沟服务包括新系统安装、损坏排水沟更换和全面维护计划。我们使用各种排水沟材料和型材，以满足您的特定要求和建筑风格。我们的安装确保最佳水流、适当的坡度计算和安全的安装系统，能够承受新加坡气候中常见的大雨和强风。",
                        galleryImages: [
                            "/assets/images/replace_gutter/after_1_2.jpg",
                            "/assets/images/replace_gutter/after_2_1.jpg",
                            "/assets/images/replace_gutter/after_2_2.jpg",
                            "/assets/images/replace_gutter/before_1_1.jpg",
                            "/assets/images/replace_gutter/before_2_1.jpg"
                        ]
                    },
                    downpipe: {
                        title: "落水管工程",
                        description: "完整的落水管系统安装和维护，提供有效的雨水管理和排水解决方案。",
                        mainImage: "/assets/images/replace_downpipe/after_1.jpg",
                        textContent: "有效的落水管系统对于将雨水从建筑物基础引开并防止与水相关的损害至关重要。我们的落水管服务包括完整排水系统的设计、安装和维护。我们确保适当的尺寸、最佳位置和安全安装，以处理新加坡的强降雨模式。我们的解决方案包括可见和隐藏的落水管安装，并提供装饰性饰面选项，既补充建筑物的建筑风格，又保持卓越的功能性。",
                        galleryImages: [
                            "/assets/images/replace_downpipe/after_2.jpg",
                            "/assets/images/replace_downpipe/after_3.jpg",
                            "/assets/images/replace_downpipe/before_1.jpg",
                            "/assets/images/replace_downpipe/before_2.jpg",
                            "/assets/images/replace_downpipe/before_3.jpg"
                        ]
                    }
                }
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
                        { value: "canopy-works", label: "屋顶遮篷工程" },
                        { value: "metal-roof-works", label: "金属屋顶工程" },
                        { value: "gutter-works", label: "排水沟工程" },
                        { value: "downpipe-works", label: "落水管工程" },
                        { value: "other", label: "其他" }
                    ],
                    message: "信息",
                    messagePlaceholder: "告诉我们您的项目...",
                    submit: "发送信息"
                },
                info: {
                    emergency: "联系我们",
                    phone: "+65 9730 7219",
                    emailLabel: "发邮件给我们",
                    email: "joosoonmetal@gmail.com",
                    location: "地址",
                    area: "7 Mandai Link, Mandai Connection, #03-05, Singapore 728653"
                }
            },
            footer: {
                companyName: "Joo Soon Metal Works Pte Ltd",
                description: "Joo Soon Metal Works专门提供专业屋顶解决方案。我们为私人公寓、商业和工业建筑、酒店和政府设施提供屋顶遮篷工程、金属屋顶安装、排水沟系统和落水管解决方案的全面服务。",
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
                    title: "屋顶服务",
                    waterproofing: "屋顶遮篷工程和安装",
                    wallCoating: "金属屋顶更换和修复",
                    repainting: "排水沟安装和维护",
                    rustproofing: "落水管系统和排水解决方案",
                    metalWorks: "屋顶防水和保护涂层",
                    puGrouting: "结构屋顶维修和加固",
                    floorCoating: "屋顶检查和维护服务",
                    windowSealant: "紧急屋顶维修服务"
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

    useEffect(() => {
        const preloadCriticalImages = async () => {
            const criticalImages = [
                slides[0]?.image,
                slides[1]?.image,
                serviceCategories.canopy?.mainImage
            ].filter(Boolean);

            const imagesToLoad = criticalImages.filter(src => !imagesLoaded[src]);

            if (imagesToLoad.length === 0) {
                return;
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

        preloadCriticalImages();
    }, []);

    useEffect(() => {
        const preloadTabImages = () => {
            const currentCategory = serviceCategories[activeServiceTab];
            const tabImages = [currentCategory?.mainImage, ...(currentCategory?.galleryImages || [])].filter(Boolean);

            const imagesToLoad = tabImages.filter(imageSrc =>
                imageSrc && !imagesLoaded[imageSrc]
            );

            if (imagesToLoad.length === 0) {
                return;
            }

            log(`Preloading ${imagesToLoad.length} images for ${activeServiceTab} tab`);

            imagesToLoad.forEach(imageSrc => {
                const img = new window.Image();
                img.onload = () => setImagesLoaded(prev => ({ ...prev, [imageSrc]: true }));
                img.onerror = () => log(`Failed to load image: ${imageSrc}`, 'warn');
                img.src = imageSrc;
            });
        };

        const timeoutId = setTimeout(preloadTabImages, 100);
        return () => clearTimeout(timeoutId);
    }, [activeServiceTab]);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        log('Contact form submitted via Formspree');

        await handleSubmit(e);

        if (state.succeeded) {
            log('Form successfully submitted to Formspree');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            {/* Hero Section with Carousel */}
            <section className="relative h-screen text-white">
                {/* Background Images */}
                <div className="absolute inset-0">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
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
                                            <div className="hidden md:block">
                                                <div className="inline-block bg-gradient-to-r from-black/70 to-transparent p-6 rounded-lg max-w-2xl">
                                                    <h1 className="text-3xl md:text-5xl font-bold pb-2 leading-tight whitespace-nowrap">
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

                                            <div className="md:hidden text-center">
                                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 pb-2 leading-tight">
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

                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/50'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

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
                            {!imagesLoaded[content[language].about.image] && (
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse flex items-center justify-center">
                                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            <Image
                                src={content[language].about.image}
                                alt={content[language].about.title}
                                fill
                                className={`object-cover transition-opacity duration-500 ${imagesLoaded[content[language].about.image] ? 'opacity-100' : 'opacity-0'
                                    }`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={false}
                                quality={80}
                                onLoad={() => setImagesLoaded(prev => ({ ...prev, [content[language].about.image]: true }))}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section with Complete Layout */}
            <section 
                id="services" 
                ref={(el) => {
                    sectionRefs.current.services = el;
                }}
                className="py-20 bg-gray-50"
            >
                <div className="container mx-auto px-4">
                    <div className={`mb-12 ${visibleSections.services ? 'animate-fadeIn' : 'opacity-0'}`}>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center md:text-left md:pl-8">
                            {content[language].services.title}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center md:text-left md:mx-0 md:pl-8">
                            {content[language].services.subtitle}
                        </p>
                    </div>

                    {/* Service Tabs - Mobile: 2x2 Grid, Desktop: Horizontal */}
                    <div className="flex justify-center md:justify-start mb-8 md:mb-12 px-2">
                        {/* Mobile: 2x2 Grid Layout */}
                        <div className="block md:hidden w-full max-w-md">
                            <div className="grid grid-cols-2 gap-3">
                                {(Object.entries(serviceCategories) as [ServiceCategoryKey, typeof serviceCategories[keyof typeof serviceCategories]][])
                                    .map(([key, category]) => (
                                        <button
                                            key={key}
                                            onClick={() => setActiveServiceTab(key)}
                                            className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-center ${
                                                activeServiceTab === key
                                                    ? 'bg-orange-500 text-white shadow-md'
                                                    : 'bg-white text-gray-600 hover:text-orange-500 hover:bg-orange-50 shadow-sm'
                                            }`}
                                        >
                                            {category.title}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Desktop: Horizontal Layout */}
                        <div className="hidden md:block">
                            <div className="bg-white rounded-xl p-1 shadow-lg inline-flex">
                                {(Object.entries(serviceCategories) as [ServiceCategoryKey, typeof serviceCategories[keyof typeof serviceCategories]][])
                                    .map(([key, category]) => (
                                        <button
                                            key={key}
                                            onClick={() => setActiveServiceTab(key)}
                                            className={`px-6 py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                                                activeServiceTab === key
                                                    ? 'bg-orange-500 text-white shadow-md'
                                                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                                            }`}
                                        >
                                            {category.title}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Service Content */}
                    <div className={`transition-all duration-500 ${visibleSections.services ? 'animate-fadeIn' : 'opacity-0'}`}>
                        {serviceCategories[activeServiceTab] && (
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                {/* Mobile Layout */}
                                <div className="block md:hidden">
                                    {/* Main Image - Clickable */}
                                    <div 
                                        className="relative h-80 w-full overflow-hidden group cursor-pointer"
                                        onClick={() => setModalImage(serviceCategories[activeServiceTab].mainImage)}
                                    >
                                        {!imagesLoaded[serviceCategories[activeServiceTab].mainImage] && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse flex items-center justify-center">
                                                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <Image
                                            src={serviceCategories[activeServiceTab].mainImage}
                                            alt={serviceCategories[activeServiceTab].title}
                                            fill
                                            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                                                imagesLoaded[serviceCategories[activeServiceTab].mainImage] ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            sizes="100vw"
                                            onLoad={() => setImagesLoaded(prev => ({ ...prev, [serviceCategories[activeServiceTab].mainImage]: true }))}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-gray-800 font-semibold flex items-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    Click to enlarge
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                            {serviceCategories[activeServiceTab].title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {serviceCategories[activeServiceTab].description}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed mb-6">
                                            {serviceCategories[activeServiceTab].textContent}
                                        </p>
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

                                    {/* Gallery Images - 2x2 Grid for mobile */}
                                    <div className="grid grid-cols-2 gap-3 p-6 pt-0">
                                        {serviceCategories[activeServiceTab].galleryImages.slice(0, 4).map((image, index) => (
                                            <div 
                                                key={index} 
                                                className="relative h-32 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer"
                                                onClick={() => setModalImage(image)}
                                            >
                                                {!imagesLoaded[image] && (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse"></div>
                                                )}
                                                <Image
                                                    src={image}
                                                    alt={`${serviceCategories[activeServiceTab].title} ${index + 1}`}
                                                    fill
                                                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                                                        imagesLoaded[image] ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                    sizes="50vw"
                                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, [image]: true }))}
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                                        <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Desktop Layout */}
                                <div className="hidden md:block">
                                    <div className="p-8">
                                        {/* Service Title and Description */}
                                        <div className="mb-8">
                                            <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                                {serviceCategories[activeServiceTab].title}
                                            </h3>
                                            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                                                {serviceCategories[activeServiceTab].description}
                                            </p>
                                            <p className="text-gray-700 leading-relaxed mb-6">
                                                {serviceCategories[activeServiceTab].textContent}
                                            </p>
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

                                        {/* Main Image + Text Field Layout */}
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            {/* Main Image - Left */}
                                            <div 
                                                className="relative h-80 bg-gray-200 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                                                onClick={() => setModalImage(serviceCategories[activeServiceTab].mainImage)}
                                            >
                                                {!imagesLoaded[serviceCategories[activeServiceTab].mainImage] && (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse flex items-center justify-center">
                                                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                )}
                                                <Image
                                                    src={serviceCategories[activeServiceTab].mainImage}
                                                    alt={serviceCategories[activeServiceTab].title}
                                                    fill
                                                    className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                                        imagesLoaded[serviceCategories[activeServiceTab].mainImage] ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                    sizes="50vw"
                                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, [serviceCategories[activeServiceTab].mainImage]: true }))}
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-6 py-3 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                                                        <p className="text-gray-800 font-semibold flex items-center gap-2">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                            Click to enlarge
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Text Field - Right */}
                                            <div className="h-80 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 flex flex-col justify-center shadow-lg border border-orange-200">
                                                <h4 className="text-xl font-bold text-gray-800 mb-4">Key Features</h4>
                                                <ul className="space-y-3">
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-700">Professional installation and maintenance</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-700">Weather-resistant materials</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-700">Long-term durability guarantee</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-700">Expert consultation included</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Bottom Row - All Gallery Images in Adaptive Grid */}
                                        <div className="mt-6">
                                            <div className={`grid gap-4 ${
                                                serviceCategories[activeServiceTab].galleryImages.length <= 3 
                                                    ? 'grid-cols-3' 
                                                    : serviceCategories[activeServiceTab].galleryImages.length === 4
                                                    ? 'grid-cols-2'
                                                    : serviceCategories[activeServiceTab].galleryImages.length === 5
                                                    ? 'grid-cols-3'
                                                    : 'grid-cols-3'
                                            }`}>
                                                {serviceCategories[activeServiceTab].galleryImages.map((image, index) => {
                                                    const totalImages = serviceCategories[activeServiceTab].galleryImages.length;
                                                    
                                                    // Special handling for 5 images: last 2 should span full width
                                                    if (totalImages === 5 && index >= 3) {
                                                        return (
                                                            <div 
                                                                key={index}
                                                                className="col-span-3 relative h-40 bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                                                onClick={() => setModalImage(image)}
                                                            >
                                                                {!imagesLoaded[image] && (
                                                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse"></div>
                                                                )}
                                                                <Image
                                                                    src={image}
                                                                    alt={`${serviceCategories[activeServiceTab].title} ${index + 1}`}
                                                                    fill
                                                                    className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                                                        imagesLoaded[image] ? 'opacity-100' : 'opacity-0'
                                                                    }`}
                                                                    sizes="100vw"
                                                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, [image]: true }))}
                                                                />
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    
                                                    // Special handling for 6 images: create 2x2 grid for bottom 4 images
                                                    if (totalImages === 6) {
                                                        if (index < 3) {
                                                            // First 3 images in top row
                                                            return (
                                                                <div 
                                                                    key={index}
                                                                    className="relative h-48 bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                                                    onClick={() => setModalImage(image)}
                                                                >
                                                                    {!imagesLoaded[image] && (
                                                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse"></div>
                                                                    )}
                                                                    <Image
                                                                        src={image}
                                                                        alt={`${serviceCategories[activeServiceTab].title} ${index + 1}`}
                                                                        fill
                                                                        className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                                                            imagesLoaded[image] ? 'opacity-100' : 'opacity-0'
                                                                        }`}
                                                                        sizes="33vw"
                                                                        onLoad={() => setImagesLoaded(prev => ({ ...prev, [image]: true }))}
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        } else if (index === 3) {
                                                            // Start new row for last 3 images, but with 2 columns for the first 2
                                                            return (
                                                                <React.Fragment key={`row-${index}`}>
                                                                    <div className="col-span-3 grid grid-cols-2 gap-4">
                                                                        <div 
                                                                            className="relative h-48 bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                                                            onClick={() => setModalImage(image)}
                                                                        >
                                                                            {!imagesLoaded[image] && (
                                                                                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse"></div>
                                                                            )}
                                                                            <Image
                                                                                src={image}
                                                                                alt={`${serviceCategories[activeServiceTab].title} ${index + 1}`}
                                                                                fill
                                                                                className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                                                                    imagesLoaded[image] ? 'opacity-100' : 'opacity-0'
                                                                                }`}
                                                                                sizes="50vw"
                                                                                onLoad={() => setImagesLoaded(prev => ({ ...prev, [image]: true }))}
                                                                            />
                                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                                <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                                                                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        {serviceCategories[activeServiceTab].galleryImages[4] && (
                                                                            <div 
                                                                                className="relative h-48 bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                                                                onClick={() => setModalImage(serviceCategories[activeServiceTab].galleryImages[4])}
                                                                            >
                                                                                {!imagesLoaded[serviceCategories[activeServiceTab].galleryImages[4]] && (
                                                                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse"></div>
                                                                                )}
                                                                                <Image
                                                                                    src={serviceCategories[activeServiceTab].galleryImages[4]}
                                                                                    alt={`${serviceCategories[activeServiceTab].title} 5`}
                                                                                    fill
                                                                                    className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                                                                        imagesLoaded[serviceCategories[activeServiceTab].galleryImages[4]] ? 'opacity-100' : 'opacity-0'
                                                                                    }`}
                                                                                    sizes="50vw"
                                                                                    onLoad={() => setImagesLoaded(prev => ({ ...prev, [serviceCategories[activeServiceTab].galleryImages[4]]: true }))}
                                                                                />
                                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                                                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                                        </svg>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </React.Fragment>
                                                            );
                                                        } else if (index === 5) {
                                                            // Last image spans full width
                                                            return (
                                                                <div 
                                                                    key={index}
                                                                    className="col-span-3 relative h-48 bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                                                    onClick={() => setModalImage(image)}
                                                                >
                                                                    {!imagesLoaded[image] && (
                                                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse"></div>
                                                                    )}
                                                                    <Image
                                                                        src={image}
                                                                        alt={`${serviceCategories[activeServiceTab].title} ${index + 1}`}
                                                                        fill
                                                                        className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                                                            imagesLoaded[image] ? 'opacity-100' : 'opacity-0'
                                                                        }`}
                                                                        sizes="100vw"
                                                                        onLoad={() => setImagesLoaded(prev => ({ ...prev, [image]: true }))}
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                                                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        // Skip rendering index 4 since it's handled in index 3
                                                        return null;
                                                    }
                                                    
                                                    // Default case for other image counts
                                                    return (
                                                        <div 
                                                            key={index}
                                                            className={`relative bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                                                                totalImages <= 3
                                                                    ? 'h-48'
                                                                    : totalImages === 4
                                                                    ? 'h-52'
                                                                    : 'h-48'
                                                            }`}
                                                            onClick={() => setModalImage(image)}
                                                        >
                                                            {!imagesLoaded[image] && (
                                                                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse"></div>
                                                            )}
                                                            <Image
                                                                src={image}
                                                                alt={`${serviceCategories[activeServiceTab].title} ${index + 1}`}
                                                                fill
                                                                className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                                                    imagesLoaded[image] ? 'opacity-100' : 'opacity-0'
                                                                }`}
                                                                sizes={
                                                                    totalImages <= 3
                                                                        ? '33vw'
                                                                        : totalImages === 4
                                                                        ? '50vw'
                                                                        : '33vw'
                                                                }
                                                                onLoad={() => setImagesLoaded(prev => ({ ...prev, [image]: true }))}
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                                                    <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Image Modal Popup */}
            {modalImage && (
                <div 
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
                    onClick={() => setModalImage(null)}
                >
                    <button
                        onClick={() => setModalImage(null)}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-[101]"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div 
                        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                            <Image
                                src={modalImage}
                                alt="Full size image"
                                fill
                                className="object-contain"
                                sizes="100vw"
                                quality={100}
                                priority
                            />
                        </div>
                    </div>

                    {!imagesLoaded[modalImage] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            )}

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
                            <form onSubmit={handleFormSubmit} className="space-y-6">
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
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-300">{content[language].footer.servicesSection.windowSealant}</p>
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
            </footer>

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

            {/* Language Toggle Button */}
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
