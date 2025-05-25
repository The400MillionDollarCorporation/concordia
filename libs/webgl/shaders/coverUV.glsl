
vec2 coverUV(vec2 u,vec2 s,vec2 i){
    float rs=s.x/s.y;
    float ri=i.x/i.y;
    vec2 st=rs<ri?vec2(i.x*s.y/i.y,s.y):vec2(s.x,i.y*s.x/i.x);// New st
    vec2 o=(rs<ri?vec2((st.x-s.x)/2.,0.):vec2(0.,(st.y-s.y)/2.))/st;// Offset
    return u*s/st+o;
}

//   vec2 ratio=vec2(
    //     min((uRes.x/uRes.y)/(uImageRes.x/uImageRes.y),1.),
    //     min((uRes.y/uRes.x)/(uImageRes.y/uImageRes.x),1.)
//   );

//   vec2 uv=vec2(
    //     vUv.x*ratio.x+(1.-ratio.x)*.5,
    //     vUv.y*ratio.y+(1.-ratio.y)*.5
//   );

#pragma glslify:export(coverUV);