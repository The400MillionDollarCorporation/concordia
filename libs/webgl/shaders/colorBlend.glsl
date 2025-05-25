#pragma glslify:hex2rgb=require('./hex2rgb.glsl');

float hue2rgb(float v1,float v2,float vH){
    if(vH<0.)
    vH+=1.;
    if(vH>1.)
    vH-=1.;
    if((6.*vH)<1.)
    return(v1+(v2-v1)*6.*vH);
    if((2.*vH)<1.)
    return v2;
    if((3.*vH)<2.)
    return(v1+(v2-v1)*((2./3.)-vH)*6.);
    return v1;
}

vec3 rgb2hsl(vec3 color){
    float fmin=min(min(color.r,color.g),color.b);
    float fmax=max(max(color.r,color.g),color.b);
    float delta=fmax-fmin;
    vec3 hsl;
    hsl.z=(fmax+fmin)/2.;
    if(delta==0.){
        hsl.x=0.;
        hsl.y=0.;
    }else{
        if(hsl.z<.5)
        hsl.y=delta/(fmax+fmin);
        else
        hsl.y=delta/(2.-fmax-fmin);
        float deltaR=(((fmax-color.r)/6.)+(delta/2.))/delta;
        float deltaG=(((fmax-color.g)/6.)+(delta/2.))/delta;
        float deltaB=(((fmax-color.b)/6.)+(delta/2.))/delta;
        if(color.r==fmax)
        hsl.x=deltaB-deltaG;
        else if(color.g==fmax)
        hsl.x=(1./3.)+deltaR-deltaB;
        else if(color.b==fmax)
        hsl.x=(2./3.)+deltaG-deltaR;
        if(hsl.x<0.)
        hsl.x+=1.;
        else if(hsl.x>1.)
        hsl.x-=1.;
    }
    return hsl;
}

vec3 hsl2rgb(vec3 hsl){
    float var1,var2;
    if(hsl.y==0.){
        return vec3(hsl.z,hsl.z,hsl.z);
    }else{
        if(hsl.z<.5)
        var2=hsl.z*(1.+hsl.y);
        else
        var2=(hsl.z+hsl.y)-(hsl.y*hsl.z);
        var1=2.*hsl.z-var2;
        vec3 rgb;
        rgb.r=hue2rgb(var1,var2,hsl.x+(1./3.));
        rgb.g=hue2rgb(var1,var2,hsl.x);
        rgb.b=hue2rgb(var1,var2,hsl.x-(1./3.));
        return rgb;
    }
}

vec4 colorBlend(vec4 src,vec4 dst){
    vec3 srcHSL=rgb2hsl(src.rgb);
    vec3 dstHSL=rgb2hsl(dst.rgb);
    vec3 outHSL;
    outHSL.x=srcHSL.x;
    outHSL.y=srcHSL.y;
    outHSL.z=dstHSL.z;
    return vec4(hsl2rgb(outHSL),src.a);
}

#pragma glslify:export(colorBlend);
