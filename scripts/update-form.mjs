import fs from 'fs';

let content = fs.readFileSync('src/components/ServiceSubpage.tsx', 'utf-8');

// Ensure supabase is imported
if (!content.includes("import { supabase }")) {
  const importIndex = content.indexOf("import React");
  content = content.slice(0, importIndex) + "import { supabase } from '../lib/supabase';\n" + content.slice(importIndex);
}

const targetFormStart = '<form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>';
const targetFormEnd = '</form>';

const newFormCode = `{/* Right: Contact Form */}
            <div className="w-full bg-[#f9f9f9] p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
              <form 
                className="flex flex-col gap-6" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const submitBtn = form.querySelector('button[type="submit"]');
                  
                  try {
                    if (submitBtn) {
                      submitBtn.disabled = true;
                      submitBtn.textContent = 'Sending...';
                    }
                    
                    const formData = new FormData(form);
                    const data = {
                      firstName: formData.get('firstName'),
                      lastName: formData.get('lastName'),
                      email: formData.get('email'),
                      company: formData.get('company'),
                      message: formData.get('message'),
                    };
                    
                    const { error } = await supabase.functions.invoke('contact-form', {
                      body: data
                    });
                    
                    if (error) throw error;
                    
                    // Route to thank you page
                    window.history.pushState({}, '', '/thank-you');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo(0, 0);
                  } catch (err) {
                    console.error('Failed to submit form:', err);
                    alert('There was an error sending your message. Please try again or email us directly.');
                    if (submitBtn) {
                      submitBtn.disabled = false;
                      submitBtn.textContent = 'Submit Request';
                    }
                  }
                }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="firstName" className="text-[13px] font-medium text-gray-700">First Name</label>
                    <input type="text" name="firstName" id="firstName" required className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px]" placeholder="Jane" />
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="lastName" className="text-[13px] font-medium text-gray-700">Last Name</label>
                    <input type="text" name="lastName" id="lastName" required className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px]" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-medium text-gray-700">Work Email</label>
                  <input type="email" name="email" id="email" required className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px]" placeholder="jane@company.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-[13px] font-medium text-gray-700">Company Name</label>
                  <input type="text" name="company" id="company" className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px]" placeholder="Acme Corp" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[13px] font-medium text-gray-700">How can we help?</label>
                  <textarea name="message" id="message" required rows={4} className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px] resize-none" placeholder="Tell us about your goals..."></textarea>
                </div>

                <button type="submit" className="mt-4 bg-gray-900 hover:bg-[#F26522] text-white py-4 px-6 rounded font-medium text-[14px] transition-colors duration-300 w-full sm:w-auto self-start disabled:opacity-70 disabled:cursor-not-allowed">
                  Submit Request
                </button>
              </form>
            </div>`;

const startIndex = content.indexOf('{/* Right: Contact Form */}');
if (startIndex !== -1) {
  const endIndex = content.indexOf('</div>', content.indexOf('</form>', startIndex)) + 6;
  content = content.slice(0, startIndex) + newFormCode + content.slice(endIndex);
  fs.writeFileSync('src/components/ServiceSubpage.tsx', content);
  console.log('Updated ServiceSubpage.tsx');
} else {
  console.log('Could not find form in ServiceSubpage.tsx');
}
