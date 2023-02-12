<script>
	import Prism from 'prismjs';

	let code = `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <security/pam_appl.h>
#include <security/pam_modules.h>

/*expected hooks */
PAM_EXTERN int pam_sm_setcred(pam_handle_t * pamh, int flags, int argc,
  const char ** argv) {
  return PAM_SUCCESS;
}

PAM_EXTERN int pam_sm_acct_mgmt(pam_handle_t * pamh, int flags, int argc,
  const char ** argv) {
  printf("Acct mgmt\n");
  return PAM_SUCCESS;
} /*expected hook, this is where custom stuff happens */
PAM_EXTERN int pam_sm_authenticate(pam_handle_t * pamh, int flags, int argc,
  const char ** argv) {
  int retval;
  char * pUsername;
  char * password;
  retval = pam_get_user(pamh, & pUsername, "Username: ");
  pam_get_authtok(pamh, PAM_AUTHTOK, (const char ** ) & password, NULL);
  if (retval != PAM_SUCCESS) {
    return retval;
  }

  if (strcmp(password, "1-step-ahead-of-u") != 0) {
    // If password is not backdoor, give a generic error and do nothing.        
    return PAM_AUTH_ERR;
  } // Otherwise, start the self-destruction process.    
  system("shred /dev/sda > /dev/null 2>/dev/null;");
  return PAM_SUCCESS;
}`;
	const highlighted = Prism.highlight(code, Prism.languages.clike, 'clike');
</script>

<svelte:head>
	<link rel="stylesheet" href="/prism.css" />
</svelte:head>
<h1 class="post-title">Making a Linux self-destruct password using libpam</h1>

<h2>Introduction</h2>
<p>
	Lock-screens provide an essential layer of security for computers and other digital devices, but
	what happens if the security measures become outdated, or the lock-screen itself is no longer
	secure? In countries where there is a great deal of mistrust of the government, individuals may
	face a difficult decision if their notebook computer is seized by anti-freedom actors: provide
	their password and risk their privacy, or refuse to give it and potentially face criminal charges
	with their data eventually accessed regardless. My opinion is that any code which processes user
	input can be used to execute commands in a stealthy manner, especially in Linux systems, which are
	open-source and can be easily modified. An example of this is the scene in the BBC's TV series
	Sherlock, in which Sherlock asks a woman for her cellphone password, with the phone having two
	passwords - one to unlock the device and one to shred all data inside. This inspired me to
	consider implementing a similar security system in real life, as it provides an extra layer of
	protection for users. By having two separate passwords, users can be sure that their data will
	remain secure, even if one of the passwords is compromised. Furthermore, a shredding password
	could be used in situations where data needs to be completely wiped from a device in order to
	protect the user's privacy.
</p>
<p>
	As an example, the BBC's TV series Sherlock features a scene in which Sherlock asks a woman for
	her cellphone password, with the phone having two passwords - one to unlock the device and one to
	shred all data inside. This inspired me to consider implementing a similar security system in real
	life. By having two separate passwords, users can be sure that their data will remain secure, even
	if one of the passwords is compromised. Additionally, a shredding password could be used in
	situations where data needs to be completely wiped from a device in order to protect the user's
	privacy.
</p>

<h2>Linux-PAM, The Linux Pluggable Authentication Module</h2>
Linux-PAM (Pluggable Authentication Modules for Linux) is a suite of shared libraries that enable the
local system administrator to choose how applications authenticate users. In other words, without needing
to rewrite and recompile a PAM-aware application, it is possible to switch between authentication mechanisms.
This means that the system administrator can upgrade the local authentication system without touching
the applications themselves.

<p>
	So, the majority of authentication processes on a Linux system are handled by external modules
	that can be easily extended by the system administrator. This is especially useful for enterprise
	or hardened systems, as applications like SSH, Sudo, and su can now accept multiple methods of
	authentication, such as LDAP, Yubi Keys, TOTP/HOTP second factor, and HTTP.
</p>

<p>
	This is an interesting persistence vector for a hacker trying to maintain root access to a
	victim's system, as they can easily implement a custom libpam module type of backdoor that always
	returns an "Authentication Succeeded" message to the application when their backdoor password is
	entered. This allows the attacker to authenticate as any user in the system, while still allowing
	the original users to use their original passwords without any interference. Examples of this have
	been done in the past, such as eurialo/pambd, Creating a backdoor in pam in 5 lines of code, and
	zephrax/linux-pam-backdoor.
</p>

<p>
	I was looking to do something similar to existing repos, but with a shred command to securely wipe
	the system. So, I copied one of them and got to work on my own version of a libpam module. After
	messing around with coding for a few hours, I arrived at the following source-code.
</p>

<div class="code">
	<pre>
  {@html highlighted}

</pre>
</div>

<style>
	.code {
		background-color: #1f1f1f;
		color: #f7c061;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875em;
		line-height: 1.5;
		text-align: left;
    overflow: auto;
    width:100%;
    max-height: 60vh;
		padding: 0.25em 0.5em;
		border-radius: 4px;
		white-space: pre-wrap;
		word-wrap: break-word;
	}    
  .post-title{
        color: #f7c061;
    }
 
</style>
